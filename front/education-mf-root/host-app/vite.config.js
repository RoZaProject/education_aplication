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
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.1.0'
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.1.0'
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^7.6.0'
        }
      }, 
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    host: true,
    port: 3000,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
  },
  dev: {
    host: true,
    port: 3000, 
  }
});
