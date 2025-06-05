import HomePage from "./home";
import { getAllPosts, getArchiveBanner, getTopCategories } from "@/lib/sanity/client";

export const revalidate = 0;

export default async function IndexPage() {
  const [posts, archiveBanner, categories] = await Promise.all([
    getAllPosts(),
    getArchiveBanner(),
    getTopCategories()
  ]);
  
  // Sort posts by date, with featured posts first
  const sortedPosts = posts.sort((a, b) => {
    // If one is featured and the other isn't, featured comes first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // If both are featured or both aren't, sort by date
    const dateA = new Date(a.publishedAt || a._createdAt);
    const dateB = new Date(b.publishedAt || b._createdAt);
    return dateB - dateA;
  });

  return (
    <HomePage 
      posts={sortedPosts} 
      archiveBanner={archiveBanner} 
      categories={categories}
    />
  );
} 