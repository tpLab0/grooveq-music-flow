
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { MusicVisualizer } from "@/components/MusicVisualizer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gradient">About GrooveQ</h1>
          
          <Card className="p-6 mb-8 glass-panel">
            <h2 className="text-2xl font-bold mb-4">Welcome to GrooveQ</h2>
            <p className="mb-4">
              GrooveQ is a real-time collaborative music queue platform that lets friends and communities
              share and enjoy music together. With an intuitive interface and democratic voting system,
              everyone has a say in what plays next.
            </p>
            
            <MusicVisualizer />
            
            <h3 className="text-xl font-bold mt-8 mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Real-time collaborative queue with WebSocket updates</li>
              <li>YouTube integration for vast music selection</li>
              <li>Democratic voting to determine playback order</li>
              <li>Create and share playlists with friends</li>
              <li>Sleek dark mode interface for comfortable viewing</li>
            </ul>
            
            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link to="/">Start Listening Now</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 glass-panel">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">1. Create or Join a Playlist</h3>
                <p className="text-muted-foreground">
                  Start your own playlist or join an existing one to collaborate with others.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">2. Add Songs</h3>
                <p className="text-muted-foreground">
                  Paste YouTube URLs to add songs to the queue. The system automatically extracts details.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">3. Vote to Reorder</h3>
                <p className="text-muted-foreground">
                  Upvote songs you want to hear sooner or downvote to push them back in the queue.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">4. Enjoy Together</h3>
                <p className="text-muted-foreground">
                  Watch as the queue updates in real-time as everyone votes and adds songs.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
