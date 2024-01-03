import { defineConfig } from 'vitest/config'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  // TODO: Remove this when Solid testing library has support for Vitest 1.0, see: https://github.com/solidjs/solid-testing-library/issues/52
  // @ts-ignore
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupVitest.js',
  },
});
