import solid from '@solidjs/vite-plugin';
import { playwright } from '@vitest/browser-playwright';
import { fileRoutes } from 'filesystem-routing/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Scaffolded with `npm create solid@latest -- --solid -t basic`: turnkey client
  // mode generates the entries around src/App.tsx (wrapped in src/Document.tsx)
  // and `vite build` prerenders the shell into dist/client.
  plugins: [solid({ start: true, extensions: ['.jsx', '.tsx'] }), fileRoutes({ types: true })],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
  build: {
    target: 'esnext',
  },
});
