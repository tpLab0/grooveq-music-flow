
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Playlist } from "@/types/song";
import { Link } from "react-router-dom";
import { useQueue } from "@/contexts/QueueContext";

interface PlaylistCardProps {
  playlist: Playlist;
}

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { currentPlaylistId, setCurrentPlaylistId } = useQueue();
  const isActive = currentPlaylistId === playlist.id;
  
  return (
    <Card className={`glass-panel transition-all ${isActive ? "border-groove-purple" : ""}`}>
      <CardHeader>
        <CardTitle className="text-lg">{playlist.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {playlist.description || "No description provided."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant={isActive ? "default" : "outline"} 
          size="sm" 
          onClick={() => setCurrentPlaylistId(playlist.id)}
        >
          {isActive ? "Active" : "Select"}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/playlists/${playlist.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
