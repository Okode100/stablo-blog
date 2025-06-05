import { groq } from "next-sanity";

// Get archive banner
export const archiveBannerQuery = groq`
*[_type == "archiveBanner"][0] {
  title,
  description,
  buttonText,
  image {
    ...,
    "blurDataURL": asset->metadata.lqip,
  }
}
`;

// Get all videos
export const videosQuery = groq`
*[_type == "video"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  title,
  slug,
  description,
  videoUrl,
  duration,
  featured,
  excerpt,
  thumbnail {
    ...,
    "blurDataURL": asset->metadata.lqip,
  },
  categories[]->
}
`;

// Get featured videos
export const featuredVideosQuery = groq`
*[_type == "video" && featured == true] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  videoUrl,
  thumbnail,
  duration,
  excerpt
}
`;

// Get single video
export const singleVideoQuery = groq`
*[_type == "video" && slug.current == $slug][0] {
  ...,
  categories[]->,
  "related": *[_type == "video" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc) [0...4] {
    title,
    slug,
    thumbnail,
    duration
  }
}
`;

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  title,
  slug,
  excerpt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  mediaContent[] {
    _type,
    title,
    _key,
    image {
      ...,
      "blurDataURL":asset->metadata.lqip
    },
    videoFile {
      asset->
    },
    videoUrl,
    thumbnail {
      ...,
      "blurDataURL":asset->metadata.lqip
    },
    audioFile {
      asset->
    },
    audioUrl,
    waveform {
      ...,
      "blurDataURL":asset->metadata.lqip
    },
    description
  },
  featured,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
}
`;

// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;

// [(($pageIndex - 1) * 10)...$pageIndex * 10]{
// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  mediaContent[] {
    _type,
    title,
    _key,
    image {
      ...,
      "blurDataURL":asset->metadata.lqip,
      alt,
      caption
    },
    videoFile {
      asset->
    },
    videoUrl,
    thumbnail {
      ...,
      "blurDataURL":asset->metadata.lqip
    },
    audioFile {
      asset->
    },
    audioUrl,
    waveform {
      ...,
      "blurDataURL":asset->metadata.lqip
    },
    description
  },
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0 ] | order(publishedAt desc, _createdAt desc) [0...5] {
    title,
    slug,
    mainImage,
    "date": coalesce(publishedAt,_createdAt)
  },
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;

export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get Posts by Category with time-series ordering
export const postsbycatquery = groq`
{
  "title": *[_type == "category" && slug.current == $slug][0].title,
  "description": *[_type == "category" && slug.current == $slug][0].description,
  "items": *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc, _createdAt desc) {
    _id,
    _createdAt,
    publishedAt,
    title,
    slug,
    excerpt,
    mainImage,
    featured,
    author->,
    categories[]->,
  }
}`;

// Get latest posts for homepage
export const latestPostsQuery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0...6] {
  _id,
  _createdAt,
  publishedAt,
  title,
  slug,
  excerpt,
  mainImage,
  featured,
  author->,
  categories[]->,
}`;

// Get top categories with post count and latest post
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)]),
  "latestPost": *[_type == "post" && references(^._id)] | order(publishedAt desc) [0] {
    title,
    slug,
    publishedAt
  }
} | order(count desc)`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;
