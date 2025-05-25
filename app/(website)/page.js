import HomePage from "./home";
import { getAllPosts, getArchiveBanner } from "@/lib/sanity/client";

export const revalidate = 0;

export default async function IndexPage() {
  const [posts, archiveBanner] = await Promise.all([
    getAllPosts(),
    getArchiveBanner()
  ]);
  
  return <HomePage posts={posts} archiveBanner={archiveBanner} />;
}

// export const revalidate = 60;
