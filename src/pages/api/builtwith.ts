import type { APIRoute } from "astro";
import { Post, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const slug = url.searchParams.get("slug");

  const data = await db
    .select()
    .from(Post)
    .where(eq(Post.slug, slug as string));

  return new Response(JSON.stringify(data));
};
