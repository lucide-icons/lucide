import { defineConfig } from 'vitest/config'
import solidPlugin from '@solidjs/vite-plugin';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupVitest.js',
  },
});
