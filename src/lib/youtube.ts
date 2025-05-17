
interface YouTubeData {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
}

// Extract the YouTube video ID from various YouTube URL formats
export function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Validate if a URL is a valid YouTube URL
export function isValidYoutubeUrl(url: string): boolean {
  return extractYoutubeId(url) !== null;
}

// Fetch video details from YouTube API (mock implementation)
export async function fetchYoutubeVideoDetails(videoId: string): Promise<YouTubeData | null> {
  // In a production app, you would use the YouTube Data API here
  // For now, we'll return mock data based on the video ID
  
  // This is a mock. In a real implementation, you would make an API call to YouTube
  return {
    videoId,
    title: `YouTube Video ${videoId.substring(0, 8)}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };
}

// Generate YouTube embed URL
export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`;
}

// Format duration in seconds to MM:SS format
export function formatDuration(seconds?: number | null): string {
  if (!seconds) return "0:00";
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
