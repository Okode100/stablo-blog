import { getAllVideos, getFeaturedVideos } from "@/lib/sanity/client";
import Container from "@/components/container";
import VideoCard from "@/components/VideoCard";

export default async function VideosPage() {
  const [videos, featuredVideos] = await Promise.all([
    getAllVideos(),
    getFeaturedVideos()
  ]);

  return (
    <Container>
      {/* Featured Videos Section */}
      {featuredVideos?.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold">Featured Videos</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredVideos.map(video => (
              <VideoCard
                key={video._id}
                video={video}
                aspect="landscape"
              />
            ))}
          </div>
        </div>
      )}

      {/* All Videos Section */}
      <div>
        <h2 className="mb-8 text-3xl font-bold">All Videos</h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {videos.map(video => (
            <VideoCard
              key={video._id}
              video={video}
              aspect="landscape"
            />
          ))}
        </div>
      </div>
    </Container>
  );
} 