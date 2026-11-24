import { defineConfig } from 'vitest/config';

export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'automatic',
      importSource: 'hono/jsx',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupVitest.js',
  },
  resolve: {
    mainFields: ['module'],
  },
});
