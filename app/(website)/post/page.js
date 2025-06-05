import { getAllPosts, getPaginatedPosts } from "@/lib/sanity/client";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Link from "next/link";

export const revalidate = 0;

const POSTS_PER_PAGE = 9;

export default async function ArticlesPage({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  
  // Get all posts for total count and first page
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Get paginated posts for current page
  const currentPosts = await getPaginatedPosts(startIndex, POSTS_PER_PAGE);

  return (
    <Container>
      {page === 1 && (
        <>
          <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
            Latest Articles
          </h1>
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The most recent stories from our blog
            </p>
          </div>
        </>
      )}

      <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {currentPosts.map(post => (
          <PostList
            key={post._id}
            post={post}
            aspect="square"
            preloadImage={true}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center space-x-4">
          {page > 1 && (
            <Link
              href={`/post?page=${page - 1}`}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              Previous
            </Link>
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/post?page=${page + 1}`}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              Next
            </Link>
          )}
        </div>
      )}
    </Container>
  );
} 