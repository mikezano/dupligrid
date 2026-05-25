import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/dupligrid/" : "/",
  plugins: [
    federation({
      name: "dupligrid",
      filename: "remoteEntry.js",
      manifest: true,
      exposes: {
        "./App": "./src/federated.ts",
      },
      shared: {
        vue: { singleton: true, requiredVersion: "^3.0.0" },
      },
    }),
    vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { port: 3003, strictPort: true, origin: "http://localhost:3003" },
  preview: { port: 3003, strictPort: true },
}));
