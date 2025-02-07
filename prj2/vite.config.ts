import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/pdf": {
        target: "http://localhost:16904",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pdf/, ""),
      },
    },
  },
});
