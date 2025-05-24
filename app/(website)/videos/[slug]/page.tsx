import { getVideoBySlug } from "@/lib/sanity/client";
import Container from "@/components/container";
import VideoCard from "@/components/VideoCard";
import { notFound } from "next/navigation";

interface VideoPageProps {
  params: {
    slug: string;
  };
}

// Helper function to get embed URL
function getEmbedUrl(videoUrl: string): string {
  try {
    const url = new URL(videoUrl);
    
    // Handle YouTube URLs
    if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
      const videoId = url.hostname.includes('youtu.be') 
        ? url.pathname.slice(1)
        : url.searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle Vimeo URLs
    if (url.hostname.includes('vimeo.com')) {
      const videoId = url.pathname.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Return original URL if no matching platform
    return videoUrl;
  } catch (error) {
    console.error('Error parsing video URL:', error);
    return videoUrl;
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getVideoBySlug(params.slug);

  if (!video) {
    notFound();
  }

  const embedUrl = getEmbedUrl(video.videoUrl);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        {/* Video Player */}
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/* Video Info */}
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            {video.title}
          </h1>
          {video.description && (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {video.description}
            </p>
          )}
        </div>

        {/* Categories */}
        {video.categories?.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {video.categories.map(category => (
                <span
                  key={category._id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Videos */}
        {video.related?.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">Related Videos</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {video.related.map(relatedVideo => (
                <VideoCard
                  key={relatedVideo.slug.current}
                  video={relatedVideo}
                  aspect="landscape"
                  minimal
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
} 