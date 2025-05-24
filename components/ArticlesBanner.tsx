import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import Link from "next/link";

interface ArticlesBannerProps {
  title: string;
  description: string;
  buttonText: string;
  image: any;
  latestPostSlug?: string;
}

export default function ArticlesBanner({
  title,
  description,
  buttonText,
  image,
  latestPostSlug
}: ArticlesBannerProps) {
  const imageUrl = urlForImage(image);

  return (
    <div className="relative w-full bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Container with padding */}
      <div className="relative py-16 md:py-24">
        {/* Content wrapper with constrained width */}
        <div className="mx-auto max-w-[85%] lg:max-w-[75%] relative h-[40vh] min-h-[400px] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-xl dark:shadow-2xl-dark">
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            {image && imageUrl && (
              <Image
                src={imageUrl.src}
                alt={image.alt || title}
                fill
                priority
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 85vw, 75vw"
                quality={90}
              />
            )}
            {/* Theme-aware gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/60 dark:from-black/50 dark:via-black/30 dark:to-black/60 transition-colors duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-transparent to-gray-900/30 dark:from-black/30 dark:via-transparent dark:to-black/30 transition-colors duration-300" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div className="max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl drop-shadow-lg transition-colors duration-300">
                {title}
              </h1>
              <p className="mb-8 text-lg text-gray-100 md:text-xl drop-shadow-md transition-colors duration-300">
                {description}
              </p>
              {latestPostSlug && (
                <Link
                  href={`/post/${latestPostSlug}`}
                  className="inline-flex items-center rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-8 py-3 text-lg font-medium text-gray-900 dark:text-white transition duration-300 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
                  {buttonText}
                  <svg
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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