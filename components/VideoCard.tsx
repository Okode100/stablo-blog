import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";

interface VideoCardProps {
  video: {
    title: string;
    slug: { current: string };
    thumbnail: any;
    duration: number;
    excerpt?: string;
  };
  aspect?: "landscape" | "square";
  minimal?: boolean;
}

export default function VideoCard({
  video,
  aspect = "landscape",
  minimal = false
}: VideoCardProps) {
  const imageProps = video?.thumbnail ? urlForImage(video.thumbnail) : null;

  return (
    <div className="group cursor-pointer">
      <div
        className={`relative overflow-hidden rounded-lg bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800 ${
          aspect === "landscape" ? "aspect-video" : "aspect-square"
        }`}>
        {imageProps && (
          <Link href={`/videos/${video.slug.current}`}>
            <Image
              src={imageProps.src}
              alt={video.title || "Thumbnail"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all"
            />
            {/* Duration Badge */}
            {video.duration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                {Math.floor(video.duration)}:
                {Math.round((video.duration % 1) * 60)
                  .toString()
                  .padStart(2, "0")}
              </div>
            )}
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Link>
        )}
      </div>

      {!minimal && (
        <div className="mt-2">
          <Link href={`/videos/${video.slug.current}`}>
            <h2 className="text-lg font-semibold leading-snug tracking-tight dark:text-white">
              {video.title}
            </h2>
          </Link>
          {video.excerpt && (
            <p className="mt-2 line-clamp-2 text-gray-600 dark:text-gray-400">
              {video.excerpt}
            </p>
          )}
        </div>
      )}
    </div>
  );
} 