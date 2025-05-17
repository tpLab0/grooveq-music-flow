
import { Socket, io } from "socket.io-client";
import { SongWithVotes } from "@/types/song";

// Events that can be emitted or listened to
export enum SocketEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  QUEUE_UPDATE = "queue_update",
  SONG_ADDED = "song_added",
  SONG_VOTED = "song_voted",
  SONG_REMOVED = "song_removed",
  SONG_PLAYING = "song_playing",
  JOIN_PLAYLIST = "join_playlist",
  LEAVE_PLAYLIST = "leave_playlist",
  ERROR = "error",
}

let socket: Socket | null = null;

export const initializeSocket = (playlistId?: string): Socket => {
  if (!socket) {
    socket = io(window.location.origin, {
      path: "/api/socket",
      autoConnect: false,
    });

    // Set up event listeners
    socket.on(SocketEvent.CONNECT, () => {
      console.log("Socket connected");
      if (playlistId) {
        socket.emit(SocketEvent.JOIN_PLAYLIST, playlistId);
      }
    });

    socket.on(SocketEvent.DISCONNECT, () => {
      console.log("Socket disconnected");
    });

    socket.on(SocketEvent.ERROR, (error) => {
      console.error("Socket error:", error);
    });

    socket.connect();
  }

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinPlaylist = (playlistId: string): void => {
  if (socket) {
    socket.emit(SocketEvent.JOIN_PLAYLIST, playlistId);
  }
};

export const leavePlaylist = (playlistId: string): void => {
  if (socket) {
    socket.emit(SocketEvent.LEAVE_PLAYLIST, playlistId);
  }
};

export const emitSongAdded = (song: SongWithVotes): void => {
  if (socket) {
    socket.emit(SocketEvent.SONG_ADDED, song);
  }
};

export const emitSongVoted = (songId: string, value: number): void => {
  if (socket) {
    socket.emit(SocketEvent.SONG_VOTED, { songId, value });
  }
};

export const emitSongRemoved = (songId: string): void => {
  if (socket) {
    socket.emit(SocketEvent.SONG_REMOVED, songId);
  }
};

export const emitSongPlaying = (songId: string): void => {
  if (socket) {
    socket.emit(SocketEvent.SONG_PLAYING, songId);
  }
};
