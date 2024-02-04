import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import svgReact from "vite-plugin-svg-react";

export default defineConfig({
  plugins: [
    svgReact(),
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
