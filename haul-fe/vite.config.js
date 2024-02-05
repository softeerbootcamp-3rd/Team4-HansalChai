import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "172.20.10.14",
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        icons: [
          {
            src: "/icon_x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icon_x192_maskable.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/icon_x512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/icon_x512_maskable.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        background_color: "#000B49",
        theme_color: "#000B49",
      },
    }),
  ],
});
