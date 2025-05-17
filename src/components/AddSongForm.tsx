
import { useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { isValidYoutubeUrl } from "@/lib/youtube";

export const AddSongForm = () => {
  const [url, setUrl] = useState("");
  const { addSong, loading } = useQueue();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    if (!isValidYoutubeUrl(url)) {
      toast.error("Invalid YouTube URL");
      return;
    }
    
    const success = await addSong(url);
    if (success) {
      setUrl("");
    }
  };

  return (
    <Card className="p-4 glass-panel animate-slide-up">
      <h3 className="text-lg font-medium mb-3 text-gradient">Add a Song</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            type="text"
            placeholder="Paste YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !url.trim()}>
            Add to Queue
          </Button>
        </div>
        <div className="text-xs text-muted-foreground text-left">
          Supports standard YouTube URLs, shorts, and embeds
        </div>
      </form>
    </Card>
  );
};
