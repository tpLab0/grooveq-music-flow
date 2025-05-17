
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { SongWithVotes } from "@/types/song";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { 
  initializeSocket, 
  disconnectSocket, 
  SocketEvent, 
  emitSongAdded,
  emitSongVoted,
  emitSongRemoved,
  emitSongPlaying,
  joinPlaylist
} from "@/lib/socket";
import { extractYoutubeId, fetchYoutubeVideoDetails } from "@/lib/youtube";

interface QueueContextType {
  queue: SongWithVotes[];
  currentSong: SongWithVotes | null;
  loading: boolean;
  addSong: (youtubeUrl: string) => Promise<boolean>;
  voteSong: (songId: string, value: number) => Promise<boolean>;
  removeSong: (songId: string) => Promise<boolean>;
  setPlayingSong: (songId: string) => Promise<boolean>;
  refreshQueue: () => Promise<void>;
  currentPlaylistId: string | null;
  setCurrentPlaylistId: (id: string | null) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<SongWithVotes[]>([]);
  const [currentSong, setCurrentSong] = useState<SongWithVotes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(null);
  const { sessionUser } = useAuth();

  const refreshQueue = useCallback(async () => {
    if (!currentPlaylistId) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/playlists/${currentPlaylistId}/songs`);
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      
      const data = await response.json();
      setQueue(data.songs);
      
      // Find the currently playing song
      const playingSong = data.songs.find((song: SongWithVotes) => song.isPlaying);
      setCurrentSong(playingSong || null);
    } catch (error) {
      console.error('Error fetching queue:', error);
      toast.error("Failed to load queue");
    } finally {
      setLoading(false);
    }
  }, [currentPlaylistId]);

  // Initialize socket and queue on mount or playlist ID change
  useEffect(() => {
    if (currentPlaylistId) {
      // Initialize socket connection
      const socket = initializeSocket();
      joinPlaylist(currentPlaylistId);
      
      // Set up socket event listeners
      socket.on(SocketEvent.QUEUE_UPDATE, (updatedSongs: SongWithVotes[]) => {
        setQueue(updatedSongs);
        const playingSong = updatedSongs.find(song => song.isPlaying);
        setCurrentSong(playingSong || null);
      });

      socket.on(SocketEvent.SONG_PLAYING, (songId: string) => {
        setQueue(prev => {
          const updatedQueue = prev.map(song => ({
            ...song,
            isPlaying: song.id === songId
          }));
          const playingSong = updatedQueue.find(song => song.isPlaying);
          setCurrentSong(playingSong || null);
          return updatedQueue;
        });
      });

      // Initial queue fetch
      refreshQueue();
      
      // Cleanup on unmount
      return () => {
        disconnectSocket();
      };
    }
  }, [currentPlaylistId, refreshQueue]);

  const addSong = async (youtubeUrl: string): Promise<boolean> => {
    if (!sessionUser.isLoggedIn) {
      toast.error("You need to be logged in to add songs");
      return false;
    }
    
    if (!currentPlaylistId) {
      toast.error("No playlist selected");
      return false;
    }
    
    const videoId = extractYoutubeId(youtubeUrl);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return false;
    }
    
    try {
      setLoading(true);
      
      // Get video details
      const videoDetails = await fetchYoutubeVideoDetails(videoId);
      if (!videoDetails) {
        toast.error("Failed to fetch video details");
        return false;
      }
      
      const response = await fetch(`/api/playlists/${currentPlaylistId}/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeId: videoId,
          title: videoDetails.title || "Unknown Title",
          thumbnailUrl: videoDetails.thumbnailUrl,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to add song");
        return false;
      }
      
      const newSong = await response.json();
      
      // Update local queue immediately
      setQueue(prevQueue => [...prevQueue, newSong]);
      
      // Notify others via socket
      emitSongAdded(newSong);
      
      toast.success("Song added to queue");
      return true;
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error("Failed to add song");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const voteSong = async (songId: string, value: number): Promise<boolean> => {
    if (!sessionUser.isLoggedIn) {
      toast.error("You need to be logged in to vote");
      return false;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/songs/${songId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to vote");
        return false;
      }
      
      // Update local queue immediately to be responsive
      setQueue(prevQueue => {
        return prevQueue.map(song => {
          if (song.id === songId) {
            // Update the user's vote and vote count
            const oldUserVoteValue = song.userVote || 0;
            const newVoteCount = song.voteCount - oldUserVoteValue + value;
            
            return {
              ...song,
              voteCount: newVoteCount,
              userVote: value
            };
          }
          return song;
        }).sort((a, b) => b.voteCount - a.voteCount); // Sort by vote count
      });
      
      // Notify others via socket
      emitSongVoted(songId, value);
      
      return true;
    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeSong = async (songId: string): Promise<boolean> => {
    if (!sessionUser.isLoggedIn) {
      toast.error("You need to be logged in to remove songs");
      return false;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to remove song");
        return false;
      }
      
      // Update local queue immediately
      setQueue(prevQueue => prevQueue.filter(song => song.id !== songId));
      
      if (currentSong?.id === songId) {
        setCurrentSong(null);
      }
      
      // Notify others via socket
      emitSongRemoved(songId);
      
      toast.success("Song removed from queue");
      return true;
    } catch (error) {
      console.error("Error removing song:", error);
      toast.error("Failed to remove song");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setPlayingSong = async (songId: string): Promise<boolean> => {
    if (!sessionUser.isLoggedIn) {
      toast.error("You need to be logged in to control playback");
      return false;
    }
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/songs/${songId}/playing`, {
        method: "PUT",
      });
      
      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to update playing song");
        return false;
      }
      
      // Update local queue immediately
      setQueue(prevQueue => {
        return prevQueue.map(song => ({
          ...song,
          isPlaying: song.id === songId
        }));
      });
      
      const playingSong = queue.find(song => song.id === songId);
      setCurrentSong(playingSong || null);
      
      // Notify others via socket
      emitSongPlaying(songId);
      
      return true;
    } catch (error) {
      console.error("Error setting playing song:", error);
      toast.error("Failed to update playing song");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <QueueContext.Provider
      value={{
        queue,
        currentSong,
        loading,
        addSong,
        voteSong,
        removeSong,
        setPlayingSong,
        refreshQueue,
        currentPlaylistId,
        setCurrentPlaylistId,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};
