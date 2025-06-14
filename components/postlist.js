import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import MediaContentRenderer from "@/components/MediaContentRenderer";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight
}) {
  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <>
      <div
        className={cx(
          "group cursor-pointer",
          minimal && "grid gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            "relative overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800",
            aspect === "landscape"
              ? "aspect-video"
              : aspect === "custom"
              ? "aspect-[5/4]"
              : "aspect-square"
          )}>
          <Link
            href={`${pathPrefix || "/post"}/${post.slug.current}`}
            aria-label="View Post">
            {imageProps ? (
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL
                })}
                alt={post.mainImage.alt || "Thumbnail"}
                priority={preloadImage}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : post.mediaContent?.[0] ? (
              <MediaContentRenderer
                content={post.mediaContent[0]}
                priority={preloadImage}
              />
            ) : null}
          </Link>
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div>
            <CategoryLabel
              categories={post.categories}
              nomargin={minimal}
            />
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                  ? "text-3xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium tracking-normal text-black"
                  : "line-clamp-2 font-semibold tracking-tight text-black",
                "mt-2 dark:text-white"
              )}>
              <Link
                href={`${pathPrefix || "/post"}/${post.slug.current}`}
                legacyBehavior>
                <a>{post.title}</a>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/post/${
                      pathPrefix ? `${pathPrefix}/` : ""
                    }${post.slug.current}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  {AuthorimageProps && (
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="20px"
                    />
                  )}
                </div>
                <span className="truncate text-sm">
                  {post?.author?.name}
                </span>
              </div>

              <span className="text-xs text-gray-300 dark:text-gray-600">
                &bull;
              </span>
              <time
                className="truncate text-sm"
                dateTime={post?.publishedAt || post._createdAt}>
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
