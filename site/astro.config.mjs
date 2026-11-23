import { defineConfig } from "astro/config";

// Static build. Pages are rendered by the same template functions as the mockups
// (../mockups/src), so the test site and the canvas can't drift apart.
export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
  devToolbar: { enabled: false },
  compressHTML: false,
  vite: { server: { fs: { allow: [".."] } } },
});
