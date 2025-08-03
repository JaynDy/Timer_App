import { defineConfig } from "vite";
import htmlConfig from "vite-plugin-html-config";

export default defineConfig({
  plugins: [
    htmlConfig({
      meta: [
        {
          name: "Content-Security-Policy",
          content:
            "default-src 'self'; connect-src 'self' https://timer-app-server.onrender.com; script-src 'self'; style-src 'self' 'unsafe-inline';",
        },
      ],
    }),
  ],
});
