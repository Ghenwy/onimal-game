import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"

export default defineConfig({
  plugins: [svelte()],
  base: "./",
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: "esnext",
    assetsDir: "assets"
  },
  resolve: {
    alias: {
      "$lib": "/src/lib",
      "$stores": "/src/stores",
      "$components": "/src/components"
    }
  }
})
