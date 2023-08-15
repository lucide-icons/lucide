import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  preset: 'vercel-edge',
  srcDir: '.vitepress',
  routeRules: {
    '/api/**': { cors: false },
  },
  rollupConfig: {
    external: ['@resvg/resvg-js-linux-arm64-gnu'],
  },
  experimental: {
    wasm: true,
  },
});
