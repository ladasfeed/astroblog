import { getCollection } from "astro:content";
import { Comment, Post, db } from "astro:db";

export default async function () {
  await db.insert(Comment).values([
    { author: "bob", body: "Hope you like Astro DB!" },
    { author: "bobbdd", body: "Enjoy!" },
  ]);

  const posts = await getCollection("blogq");
  const existingPostsSlug = (await db.select().from(Post)).map(
    (post) => post.slug
  );

  const postsToCreate = posts
    .filter((post) => !existingPostsSlug.includes(post.slug))
    .map((post) => ({
      author: post.id,
      slug: post.slug,
    }));

  await db.insert(Post).values(postsToCreate);
}
