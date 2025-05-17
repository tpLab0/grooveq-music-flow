
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MusicIcon } from "lucide-react";

export const Header = () => {
  const { sessionUser, logout } = useAuth();
  const isLoggedIn = sessionUser.isLoggedIn;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <MusicIcon className="h-8 w-8 text-groove-purple" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-groove-pink rounded-full animate-music-pulse"></div>
            </div>
            <span className="text-xl font-bold text-gradient">GrooveQ</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-groove-purple transition-colors">
            Home
          </Link>
          <Link to="/playlists" className="text-sm font-medium hover:text-groove-purple transition-colors">
            Playlists
          </Link>
          {isLoggedIn && (
            <Link to="/create" className="text-sm font-medium hover:text-groove-purple transition-colors">
              Create Playlist
            </Link>
          )}
          <Link to="/about" className="text-sm font-medium hover:text-groove-purple transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm hidden md:inline-block">
                {sessionUser.user?.name || sessionUser.user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
