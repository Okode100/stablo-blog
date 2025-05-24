import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import Link from "next/link";

interface ArchiveBannerProps {
  title: string;
  description: string;
  buttonText: string;
  image: any;
  latestPostSlug?: string;
}

export default function ArchiveBanner({
  title,
  description,
  buttonText,
  image,
  latestPostSlug
}: ArchiveBannerProps) {
  const imageUrl = urlForImage(image);

  return (
    <div className="relative w-full bg-black">
      {/* Container with padding */}
      <div className="relative py-16 md:py-24">
        {/* Content wrapper with constrained width */}
        <div className="mx-auto max-w-[85%] lg:max-w-[75%] relative h-[40vh] min-h-[400px] overflow-hidden rounded-2xl">
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            {image && imageUrl && (
              <Image
                src={imageUrl.src}
                alt={image.alt || title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 85vw, 75vw"
                quality={90}
              />
            )}
            {/* Multiple gradient overlays for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                {title}
              </h1>
              <p className="mb-8 text-lg text-gray-100 md:text-xl drop-shadow-md">
                {description}
              </p>
              {latestPostSlug && (
                <Link
                  href={`/post/${latestPostSlug}`}
                  className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-8 py-3 text-lg font-medium text-gray-900 transition duration-300 hover:bg-white hover:scale-105">
                  {buttonText}
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 