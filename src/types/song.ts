
export interface Song {
  id: string;
  youtubeId: string;
  title: string;
  artist?: string | null;
  thumbnailUrl?: string | null;
  duration?: number | null;
  addedById: string;
  playlistId: string;
  position: number;
  isPlaying: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Vote {
  id: string;
  value: number;
  userId: string;
  songId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SongWithVotes extends Song {
  votes: Vote[];
  voteCount: number;
  userVote?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string | null;
  ownerId: string;
  isPublic: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}
