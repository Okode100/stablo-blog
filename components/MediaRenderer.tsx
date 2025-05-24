import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface MediaRendererProps {
  post: {
    mediaType: "image" | "video" | "audio" | "none";
    mainImage?: any;
    videoFile?: {
      asset: {
        url: string;
      };
      duration?: number;
      thumbnail?: any;
    };
    videoUrl?: string;
    audioFile?: {
      asset: {
        url: string;
      };
      duration?: number;
      waveform?: any;
    };
    audioUrl?: string;
  };
  priority?: boolean;
  className?: string;
}

export default function MediaRenderer({
  post,
  priority = false,
  className = ""
}: MediaRendererProps) {
  if (!post.mediaType || post.mediaType === "none") {
    return null;
  }

  switch (post.mediaType) {
    case "image":
      if (!post.mainImage) return null;
      const imageProps = urlForImage(post.mainImage);
      return (
        <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
          <Image
            src={imageProps.src}
            alt={post.mainImage.alt || "Post image"}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      );

    case "video":
      if (!post.videoFile?.asset?.url && !post.videoUrl) return null;
      
      // For external video URLs (YouTube, Vimeo, etc.)
      if (post.videoUrl) {
        return (
          <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
            <iframe
              src={getEmbedUrl(post.videoUrl)}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        );
      }

      // For uploaded video files
      return (
        <div className={`relative aspect-video overflow-hidden rounded-lg ${className}`}>
          <video
            src={post.videoFile.asset.url}
            controls
            className="h-full w-full"
            poster={post.videoFile.thumbnail ? urlForImage(post.videoFile.thumbnail).src : undefined}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );

    case "audio":
      if (!post.audioFile?.asset?.url && !post.audioUrl) return null;

      // For external audio URLs (SoundCloud, Spotify, etc.)
      if (post.audioUrl) {
        return (
          <div className={`relative overflow-hidden rounded-lg ${className}`}>
            <iframe
              src={getEmbedUrl(post.audioUrl)}
              title="Audio player"
              allow="autoplay; clipboard-write; encrypted-media;"
              className="w-full border-0"
              height="160"
            />
          </div>
        );
      }

      // For uploaded audio files
      return (
        <div className={`relative overflow-hidden rounded-lg ${className} bg-gray-100 dark:bg-gray-800 p-4`}>
          {post.audioFile.waveform && (
            <div className="relative h-24 mb-2">
              <Image
                src={urlForImage(post.audioFile.waveform).src}
                alt="Audio waveform"
                fill
                className="object-contain"
              />
            </div>
          )}
          <audio
            src={post.audioFile.asset.url}
            controls
            className="w-full"
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      );

    default:
      return null;
  }
}

// Helper function to get embed URL for external media
function getEmbedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      const videoId = urlObj.hostname.includes('youtu.be')
        ? urlObj.pathname.slice(1)
        : urlObj.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // SoundCloud
    if (urlObj.hostname.includes('soundcloud.com')) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`;
    }
    
    // Spotify
    if (urlObj.hostname.includes('spotify.com')) {
      return url.replace('/track/', '/embed/track/');
    }
    
    return url;
  } catch (error) {
    console.error('Error parsing media URL:', error);
    return url;
  }
} 