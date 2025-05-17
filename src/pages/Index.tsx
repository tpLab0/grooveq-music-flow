
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { SongPlayer } from "@/components/SongPlayer";
import { SongQueue } from "@/components/SongQueue";
import { AddSongForm } from "@/components/AddSongForm";
import { MusicVisualizer } from "@/components/MusicVisualizer";
import { useQueue } from "@/contexts/QueueContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { currentPlaylistId, queue } = useQueue();
  const { sessionUser } = useAuth();

  // Select a playlist when component mounts if none is selected
  useEffect(() => {
    if (!currentPlaylistId && queue.length === 0) {
      // For demo purposes, we'll assume there's a default playlist
      // In a real app, you'd fetch available playlists here
      // or redirect to playlist selection
    }
  }, [currentPlaylistId, queue.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 container py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
            <span className="text-gradient">GrooveQ</span>
            <span className="text-xl font-normal text-muted-foreground">
              Collaborative Music Queue
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              <SongPlayer />
              <MusicVisualizer />
              
              {sessionUser.isLoggedIn ? (
                <AddSongForm />
              ) : (
                <div className="glass-panel p-4 rounded-lg text-center">
                  <p className="mb-3">Sign in to add songs to the queue and vote</p>
                  <div className="flex justify-center gap-3">
                    <Button asChild variant="outline">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Queue</h2>
                {currentPlaylistId && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/playlists">Change Playlist</Link>
                  </Button>
                )}
              </div>
              <SongQueue />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-4">
        <div className="container flex flex-col items-center justify-center">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GrooveQ - Collaborative Music Queue
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
