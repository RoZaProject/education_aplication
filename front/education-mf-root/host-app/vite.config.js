import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host_app",
      remotes: {
        auth_app: "http://localhost:5173/assets/remoteEntry.js",
        dashboard_app: "http://localhost:5174/assets/remoteEntry.js",
        result_app: "http://localhost:5175/assets/remoteEntry.js",
        land_app: "http://localhost:5176/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"], // 
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  dev: {
    port: 3000, 
  }
});
