import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";

export default defineConfig({
  site: "https://7ate9-blog.site",
  integrations: [react(), sitemap(), tailwind(), astroI18next(), mdx()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  paths: {
    "@components/*": ["src/components/*"],
    "@assets/*": ["src/assets/*"],
    "@posts-assets/*": ["src/content/posts/assets/*"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // path to your scss variables
          additionalData: `@import "./src/stylesV2/mixins.scss";@import "./src/stylesV2/variables.scss";`,
        },
      },
    },
  },
});
