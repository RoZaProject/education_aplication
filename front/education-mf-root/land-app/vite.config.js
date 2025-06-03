import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "land_app",
      filename: "remoteEntry.js",
      exposes: {
        './LandingPage': './src/pages/LandingPage.jsx',
      },
      shared: ['react', 'react-dom'] // ✅ ВАЖНО!
    }),
  ],
  build: {
    
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    host: true,
    port: 5176, 
  }
});
