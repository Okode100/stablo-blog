import { getPostsByCategory } from "@/lib/sanity/client";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: any;
  excerpt?: string;
  publishedAt?: string;
  _createdAt: string;
  featured?: boolean;
  author?: any;
  categories?: any[];
}

interface CategoryData {
  title: string;
  description?: string;
  items: Post[];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getPostsByCategory(params.slug) as CategoryData;

  if (!posts || !posts.title) {
    notFound();
  }

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        {/* Category Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-brand-primary dark:text-white md:text-4xl">
            {posts.title}
          </h1>
          {posts.description && (
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {posts.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {posts.items && posts.items.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
            {posts.items.map(post => (
              <PostList 
                key={post._id} 
                post={post} 
                aspect="square"
                minimal={false}
                pathPrefix=""
                preloadImage={false}
                fontSize="large"
                fontWeight="normal"
              />
            ))}
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">
              No posts found in this category
            </span>
          </div>
        )}
      </div>
    </Container>
  );
} 