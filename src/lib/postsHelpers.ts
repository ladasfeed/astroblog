import type { CollectionEntry } from "astro:content";

export const normalizePosts = (
  posts: Array<CollectionEntry<"posts">>
): Array<CollectionEntry<"posts">> => {
  return posts.map((post) => ({
    ...post,
    slug: post.slug.slice(3),
    id: post.id.slice(3),
  })) as Array<CollectionEntry<"posts">>;
};
