import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx?$/]
    },
    setupFiles: './tests/setupVitest.js',
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});
