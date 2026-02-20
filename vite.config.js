import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),

    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Awesome Todo List",
        short_name: "TodoApp",
        description: "Manage your tasks easily and offline!",
        theme_color: "#ffffff",
        icons: [
          {
            src: "192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
