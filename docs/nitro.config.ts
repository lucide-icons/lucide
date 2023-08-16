import { defineNitroConfig } from 'nitropack';

export default defineNitroConfig({
  preset: 'vercel-edge',
  srcDir: '.vitepress',
  routeRules: {
    '/api/**': { cors: false },
  },
  experimental: {
    wasm: true,
  },
});
