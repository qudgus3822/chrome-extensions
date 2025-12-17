import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/contents/index.ts"),
        popup: resolve(__dirname, "src/ui/popup.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
    },
    emptyOutDir: true,
    minify: false,
  },
  publicDir: "public",
});
