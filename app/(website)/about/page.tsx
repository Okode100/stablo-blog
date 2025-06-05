import { getAllAuthors, getSettings } from "@/lib/sanity/client";
import About from "./about";

export const revalidate = 0;

interface Author {
  _id: string;
  name: string;
  slug: string;
  image?: any;
  bio?: any[];
  postCount: number;
}

interface Settings {
  title?: string;
  description?: string;
  // Add other settings fields as needed
}

export default async function AboutPage() {
  const [authors, settings] = await Promise.all([
    getAllAuthors(),
    getSettings()
  ]);

  return <About settings={settings as Settings} authors={authors as Author[]} />;
} 