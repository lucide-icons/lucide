import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.jsx?$/],
    },
    setupFiles: './tests/setupVitest.js',
    threads: false,
    isolate: false,
    watch: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
