import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://ladasfeed.github.io",
  integrations: [mdx(), sitemap(), react(), tailwind(), db()],
  output: "hybrid",
  //  adapter: vercel(),
  adapter: vercel(),
});
