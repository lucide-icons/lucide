import { defineConfig } from 'nitro';

export default defineConfig({
  compatibilityDate: '2026-02-26',
  preset: 'vercel',
  serverDir: './',
  ignore: ['.vitepress/plugins'],
});
