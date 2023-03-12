import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), pagefind()],
});
