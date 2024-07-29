import { column, defineDb, defineTable } from "astro:db";

const Comment = defineTable({
  columns: {
    author: column.text(),
    body: column.text(),
  },
});

const Post = defineTable({
  columns: {
    author: column.text(),
    slug: column.text(),
  },
});

export default defineDb({
  tables: { Comment, Post },
});
