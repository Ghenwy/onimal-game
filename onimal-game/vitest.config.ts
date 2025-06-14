import { defineConfig } from "vitest/config"
import { svelte } from "@sveltejs/vite-plugin-svelte"

export default defineConfig({
  plugins: [svelte()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{js,ts}", "src/**/*.{test,spec}.{js,ts}"],
    globals: true
  },
  resolve: {
    alias: {
      "$lib": "/src/lib",
      "$stores": "/src/stores", 
      "$components": "/src/components"
    }
  }
})