import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/timers": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
