import { getAuthorPostsBySlug, getAllAuthorsSlugs } from "@/lib/sanity/client";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import AuthorCard from "@/components/blog/authorCard";
import { notFound } from "next/navigation";

export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getAllAuthorsSlugs();
  return slugs;
}

export default async function AuthorPage({ params }) {
  const authorData = await getAuthorPostsBySlug(params.slug);
  
  if (!authorData) {
    notFound();
  }

  return (
    <Container>
      <div className="mx-auto max-w-screen-xl">
        {/* Author Card */}
        <div className="mb-10">
          <AuthorCard author={authorData[0]?.author} />
        </div>

        {/* Author's Posts */}
        <h2 className="mb-8 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Articles by {authorData[0]?.author?.name}
        </h2>
        
        <div className="grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {authorData.map(post => (
            <PostList
              key={post._id}
              post={post}
              aspect="square"
              preloadImage={true}
            />
          ))}
        </div>
      </div>
    </Container>
  );
} 