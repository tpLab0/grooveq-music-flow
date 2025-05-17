
import { useQueue } from "@/contexts/QueueContext";
import { useAuth } from "@/contexts/AuthContext";
import { SongWithVotes } from "@/types/song";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Play,
  Music,
} from "lucide-react";
import { formatDuration } from "@/lib/youtube";
import { Skeleton } from "@/components/ui/skeleton";

export const SongQueue = () => {
  const { queue, voteSong, removeSong, setPlayingSong, loading, currentSong } = useQueue();
  const { sessionUser } = useAuth();
  const isLoggedIn = sessionUser.isLoggedIn;

  // Sort queue by vote count descending
  const sortedQueue = [...queue].sort((a, b) => b.voteCount - a.voteCount);

  // Handle voting
  const handleVote = async (songId: string, value: number) => {
    await voteSong(songId, value);
  };

  // Handle removal
  const handleRemove = async (songId: string) => {
    await removeSong(songId);
  };

  // Handle playing
  const handlePlay = async (songId: string) => {
    await setPlayingSong(songId);
  };

  if (loading && queue.length === 0) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-3 glass-panel">
            <div className="flex items-center">
              <Skeleton className="h-12 w-12 rounded-md mr-3" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <Card className="p-4 glass-panel text-center">
        <div className="flex flex-col items-center py-6">
          <Music size={48} className="text-muted-foreground mb-2" />
          <h3 className="font-medium mb-1">Queue is Empty</h3>
          <p className="text-sm text-muted-foreground">
            Add your favorite songs to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {sortedQueue.map((song: SongWithVotes) => (
        <Card 
          key={song.id} 
          className={`p-3 glass-panel transition-all ${
            song.isPlaying ? "border-groove-purple/50 bg-groove-purple/10" : ""
          }`}
        >
          <div className="flex items-center">
            {/* Thumbnail */}
            <div className="relative mr-3">
              <img
                src={song.thumbnailUrl || "/placeholder.svg"}
                alt={song.title}
                className="h-12 w-12 object-cover rounded-md"
              />
              {song.isPlaying && (
                <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                  <div className="text-xs font-medium text-white px-2 py-0.5 bg-groove-purple rounded-sm">
                    Playing
                  </div>
                </div>
              )}
            </div>

            {/* Song info */}
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-1">{song.title}</h4>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{song.artist || "Unknown artist"}</span>
                {song.duration && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{formatDuration(song.duration)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Vote controls */}
            {isLoggedIn && (
              <div className="flex items-center space-x-1 ml-2">
                {!song.isPlaying && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handlePlay(song.id)}
                    title="Play now"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                )}

                <div className="flex flex-col items-center bg-secondary rounded-md px-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 ${song.userVote === 1 ? "text-groove-purple" : ""}`}
                    onClick={() => handleVote(song.id, 1)}
                    title="Upvote"
                    disabled={loading}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>

                  <span className="text-xs font-medium">{song.voteCount}</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 ${song.userVote === -1 ? "text-destructive" : ""}`}
                    onClick={() => handleVote(song.id, -1)}
                    title="Downvote"
                    disabled={loading}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Show remove button for user's own songs */}
                {song.addedById === sessionUser.user?.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/80"
                    onClick={() => handleRemove(song.id)}
                    title="Remove"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
