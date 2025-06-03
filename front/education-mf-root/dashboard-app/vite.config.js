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
    port: 5174,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
  },
  preview: {
    host: true,
    port: 5174, 
  }
});
