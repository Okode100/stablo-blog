import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";

interface MediaContentRendererProps {
  content: {
    _type: string;
    title?: string;
    image?: any;
    videoFile?: {
      asset: {
        url: string;
      };
    };
    videoUrl?: string;
    thumbnail?: any;
    audioFile?: {
      asset: {
        url: string;
      };
    };
    audioUrl?: string;
    waveform?: any;
    description?: string;
  };
  priority?: boolean;
  className?: string;
}

export default function MediaContentRenderer({
  content,
  priority = false,
  className = ""
}: MediaContentRendererProps) {
  if (!content || !content._type) return null;

  const sectionClassName = `relative overflow-hidden rounded-lg mb-8 ${className}`;

  switch (content._type) {
    case "imageSection":
      if (!content.image) return null;
      const imageProps = urlForImage(content.image);
      return (
        <div className={sectionClassName}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4 dark:text-white">{content.title}</h3>
          )}
          <div className="relative aspect-video">
            <Image
              src={imageProps.src}
              alt={content.image.alt || ""}
              fill
              priority={priority}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {content.image.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              {content.image.caption}
            </p>
          )}
        </div>
      );

    case "videoSection":
      if (!content.videoFile?.asset?.url && !content.videoUrl) return null;
      
      return (
        <div className={sectionClassName}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4 dark:text-white">{content.title}</h3>
          )}
          <div className="relative aspect-video">
            {content.videoUrl ? (
              <iframe
                src={getEmbedUrl(content.videoUrl)}
                title={content.title || "Video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <video
                src={content.videoFile.asset.url}
                controls
                className="h-full w-full"
                poster={content.thumbnail ? urlForImage(content.thumbnail).src : undefined}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {content.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-4">{content.description}</p>
          )}
        </div>
      );

    case "audioSection":
      if (!content.audioFile?.asset?.url && !content.audioUrl) return null;

      return (
        <div className={sectionClassName}>
          {content.title && (
            <h3 className="text-xl font-semibold mb-4 dark:text-white">{content.title}</h3>
          )}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            {content.waveform && (
              <div className="relative h-24 mb-4">
                <Image
                  src={urlForImage(content.waveform).src}
                  alt="Audio waveform"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {content.audioUrl ? (
              <iframe
                src={getEmbedUrl(content.audioUrl)}
                title={content.title || "Audio player"}
                allow="autoplay; clipboard-write; encrypted-media;"
                className="w-full border-0"
                height="160"
              />
            ) : (
              <audio
                src={content.audioFile.asset.url}
                controls
                className="w-full"
              >
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
          {content.description && (
            <p className="text-gray-600 dark:text-gray-400 mt-4">{content.description}</p>
          )}
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