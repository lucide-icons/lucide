import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'


export default defineConfig({
  plugins: [svelte({ hot: false })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupVitest.js',
    threads: false,
    isolate: false,
  },
  // resolve: {
  //   conditions: ['development', 'browser'],
  // },
});
