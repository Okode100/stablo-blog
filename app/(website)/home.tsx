import Link from "next/link";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import ArticlesBanner from "@/components/ArticlesBanner";
import CategoryLabel from "@/components/blog/category";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  count: number;
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  publishedAt?: string;
  _createdAt: string;
  featured?: boolean;
  author?: any;
  categories?: any[];
}

interface HomeProps {
  posts: Post[];
  archiveBanner?: any;
  categories?: Category[];
}

export default function Home({ posts, archiveBanner, categories }: HomeProps) {
  const latestPostSlug = posts[0]?.slug?.current;

  return (
    <>
      {/* Banner Section */}
      {archiveBanner && (
        <ArticlesBanner {...archiveBanner} latestPostSlug={latestPostSlug} />
      )}

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <Container>
          <div className="mb-16">
            <h2 className="mb-8 text-3xl font-bold">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <Link
                  key={category._id}
                  href={`/category/${category.slug.current}`}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                  <span>{category.title}</span>
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      )}

      {/* Featured and Latest Posts */}
      {posts && (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {posts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
                minimal={false}
                pathPrefix=""
                fontSize="large"
                fontWeight="normal"
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts.slice(2, 14).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="square"
                preloadImage={false}
                minimal={false}
                pathPrefix=""
                fontSize="large"
                fontWeight="normal"
              />
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