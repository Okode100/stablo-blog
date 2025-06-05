import Container from "@/components/container";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@/lib/sanity/plugins/portabletext";

export default function About({ authors, settings }) {
  return (
    <Container>
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        About Us
      </h1>
      <div className="text-center">
        <p className="text-lg">Meet our team of writers and contributors</p>
      </div>

      <div className="mb-16 mt-6 grid gap-5 sm:grid-cols-2 md:mb-32 md:mt-16 md:gap-16 lg:grid-cols-3">
        {authors.map(author => {
          const imageProps = author?.image ? urlForImage(author.image) : null;
          return (
            <div
              key={author._id}
              className="relative flex flex-col items-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-slate-50">
                <Link href={`/author/${author.slug}`}>
                  {imageProps ? (
                    <Image
                      src={imageProps.src}
                      alt={author.name || "Author"}
                      fill
                      sizes="(max-width: 320px) 100vw, 320px"
                      className="object-cover transition-all hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500">
                      No Image
                    </div>
                  )}
                </Link>
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {author.name}
                </h2>
                {author.bio && (
                  <div className="prose mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <PortableText value={author.bio} />
                  </div>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  {author.postCount} {author.postCount === 1 ? 'article' : 'articles'}
                </div>
                <Link
                  href={`/author/${author.slug}`}
                  className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
                  View Profile →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {settings?.description || "We are a team of passionate writers and creators dedicated to bringing you the best content."}
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Get in touch
          </Link>
        </div>
      </div>
    </Container>
  );
}
