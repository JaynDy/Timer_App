import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    electron({
      entry: "electron/electron.js",
    }),
    viteStaticCopy({
      targets: [
        {
          src: "electron/preload.js",
          dest: "electron",
        },
        {
          src: "electron/store.js",
          dest: "electron",
        },
      ],
    }),
  ],
});
