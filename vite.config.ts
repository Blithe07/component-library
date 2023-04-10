import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

import path from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(),
    dts({
      include: ["packages/**/*", "packages/**/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@yh-element-plus": fileURLToPath(new URL("./packages", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/ycmp-auth-center": "http://192.168.74.151:10018",
      "/yhinn-baseparam": "http://192.168.74.151:10018",
      "/yhinn-periodicreport": "http://192.168.74.151:10018",
      "/yhinn-announce": "http://192.168.74.151:10018/",
    },
  },
  css: { preprocessorOptions: { scss: { charset: false } } },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "YhElementPlus",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      // 输出
      output: {},
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-plus"],
    },
  },
});
