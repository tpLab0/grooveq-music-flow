
import { useEffect, useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Card } from "@/components/ui/card";
import { getYoutubeEmbedUrl } from "@/lib/youtube";

export const SongPlayer = () => {
  const { currentSong, queue } = useQueue();
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    if (currentSong?.youtubeId) {
      setEmbedUrl(getYoutubeEmbedUrl(currentSong.youtubeId));
    } else if (queue.length > 0) {
      // Auto-play the top voted song if nothing is currently playing
      const topSong = [...queue].sort((a, b) => b.voteCount - a.voteCount)[0];
      setEmbedUrl(getYoutubeEmbedUrl(topSong.youtubeId));
    } else {
      setEmbedUrl("");
    }
  }, [currentSong, queue]);

  if (!embedUrl) {
    return (
      <Card className="w-full aspect-video bg-muted/30 rounded-lg flex flex-col items-center justify-center glass-panel text-muted-foreground">
        <div className="flex flex-col items-center">
          <div className="text-lg mb-2">No songs in the queue</div>
          <p className="text-sm">Add songs to start listening!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden rounded-lg glass-panel">
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
      </div>
    </Card>
  );
};
