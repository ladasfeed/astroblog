import { CATEGORIES } from "@consts";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.enum(CATEGORIES as [string, ...string[]]), // WTF
  }),
});

const tags = defineCollection({
  type: "data",
  schema: z.array(z.string()),
});

export const collections = { posts, tags };
