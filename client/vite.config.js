/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
export default defineConfig({
  // … your existing Vite config …
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  }
})
