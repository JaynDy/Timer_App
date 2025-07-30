import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/timers": "http://localhost:3000",
      "/sound": "http://localhost:3000",
    },
  },
});
