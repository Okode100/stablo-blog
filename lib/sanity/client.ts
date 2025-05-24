import { apiVersion, dataset, projectId, useCdn } from "./config";
import {
  postquery,
  limitquery,
  paginatedquery,
  configQuery,
  singlequery,
  pathquery,
  allauthorsquery,
  authorsquery,
  postsbyauthorquery,
  postsbycatquery,
  catpathquery,
  catquery,
  getAll,
  searchquery,
  archiveBannerQuery
} from "./groq";
import { createClient } from "next-sanity";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: 'published'
    })
  : null;

export const fetcher = async ([query, params]) => {
  if (!client) return [];
  try {
    return await client.fetch(query, params);
  } catch (err) {
    console.error('Error fetching from Sanity:', err);
    return [];
  }
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?"
      );
    }
  }
})();

export async function getAllPosts() {
  if (!client) return [];
  try {
    const posts = await client.fetch(postquery);
    return posts || [];
  } catch (err) {
    console.error('Error fetching posts:', err);
    return [];
  }
}

export async function getSettings() {
  if (!client) return null;
  try {
    const settings = await client.fetch(configQuery);
    return settings || null;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return null;
  }
}

export async function getPostBySlug(slug) {
  if (client) {
    return (await client.fetch(singlequery, { slug })) || {};
  }
  return {};
}

export async function getAllPostsSlugs() {
  if (client) {
    const slugs = (await client.fetch(pathquery)) || [];
    return slugs.map(slug => ({ slug }));
  }
  return [];
}
// Author
export async function getAllAuthorsSlugs() {
  if (client) {
    const slugs = (await client.fetch(authorsquery)) || [];
    return slugs.map(slug => ({ author: slug }));
  }
  return [];
}

export async function getAuthorPostsBySlug(slug) {
  if (client) {
    return (await client.fetch(postsbyauthorquery, { slug })) || {};
  }
  return {};
}

export async function getAllAuthors() {
  if (client) {
    return (await client.fetch(allauthorsquery)) || [];
  }
  return [];
}

// Category

export async function getAllCategories() {
  if (client) {
    const slugs = (await client.fetch(catpathquery)) || [];
    return slugs.map(slug => ({ category: slug }));
  }
  return [];
}

export async function getPostsByCategory(slug) {
  if (client) {
    return (await client.fetch(postsbycatquery, { slug })) || {};
  }
  return {};
}

export async function getTopCategories() {
  if (client) {
    return (await client.fetch(catquery)) || [];
  }
  return [];
}

export async function getPaginatedPosts({ limit, pageIndex = 0 }) {
  if (client) {
    return (
      (await client.fetch(paginatedquery, {
        pageIndex: pageIndex,
        limit: limit
      })) || []
    );
  }
  return [];
}

export async function getArchiveBanner() {
  if (!client) return null;
  try {
    const banner = await client.fetch(archiveBannerQuery);
    if (!banner) {
      console.log('No Archive Banner found in Sanity');
    }
    return banner || null;
  } catch (err) {
    console.error('Error fetching archive banner:', err);
    return null;
  }
}
