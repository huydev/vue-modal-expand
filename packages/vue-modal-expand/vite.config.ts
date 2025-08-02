import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dts from "unplugin-dts/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
      cleanVueFileName: true,
      staticImport: true,
      bundleTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueModalExpand",
      fileName: "index",
      formats: ["es", "umd"],
    },
    // sourcemap: true,
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
