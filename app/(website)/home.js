import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import ArticlesBanner from "@/components/ArticlesBanner";

export default function Post({ posts, archiveBanner }) {
  const latestPostSlug = posts[0]?.slug?.current;

  return (
    <>
      {/* Banner Section */}
      {archiveBanner && (
        <ArticlesBanner {...archiveBanner} latestPostSlug={latestPostSlug} />
      )}

      {/* Main Content */}
      {posts && (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
            {posts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {posts.slice(2, 14).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/articles"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <span>View all Articles</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
