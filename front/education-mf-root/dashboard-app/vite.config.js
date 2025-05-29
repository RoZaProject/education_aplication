import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "dashboard_app",
      filename: "remoteEntry.js",
      exposes: {
        "./HomePage": "./src/pages/HomePage.jsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5174, 
  }
});
