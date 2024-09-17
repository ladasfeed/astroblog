import { getCollection } from "astro:content";
import pick from "lodash/pick";
import queryString from "query-string";

type GetPostsDTO = {
  tags: string[];
};

export const GET = async ({ request }) => {
  const search = request.url.slice(request.url.lastIndexOf("?"));

  const parsed = queryString.parse(search, { arrayFormat: "comma" });

  const postsRaw = (await getCollection("posts")).map((item) =>
    pick(item, ["data"])
  );

  let filteredPosts = postsRaw;

  if (parsed.tags) {
    const tags = Array.isArray(parsed.tags)
      ? parsed.tags
      : ([parsed.tags] as string[]);

    filteredPosts = filteredPosts.filter((post) => {
      return tags.some((tag) => {
        return post.data.tags?.find((innerTag) => innerTag == tag);
      });
    });
  }

  return new Response(JSON.stringify(filteredPosts));
};
