import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.jsx?$/],
    },
    setupFiles: './tests/setupVitest.js',
    threads: false,
    isolate: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
