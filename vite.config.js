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
          src: "electron/electron.js",
          dest: "electron",
        },
      ],
    }),
  ],
  server: {
    port: 5173,
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { viteStaticCopy } from "vite-plugin-static-copy";

// export default defineConfig({
//   plugins: [
//     react(),
//     viteStaticCopy({
//       targets: [
//         {
//           src: "public/preload.js",
//           dest: "",
//         },
//       ],
//     }),
//   ],
//   build: {
//     outDir: "dist",
//   },
//   base: "./",
// });
