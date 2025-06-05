import { getAllAuthors, getSettings } from "@/lib/sanity/client";
import About from "./about";

export const revalidate = 0;

export default async function AboutPage() {
  const [authors, settings] = await Promise.all([
    getAllAuthors(),
    getSettings()
  ]);

  return <About settings={settings} authors={authors} />;
}
