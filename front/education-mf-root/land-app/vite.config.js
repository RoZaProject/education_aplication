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
    port: 5176,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*"
    },
  },   
  preview: {
    host: true,
    port: 5176, 
  }
});
