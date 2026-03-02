import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

export default defineNitroConfig({
  compatibilityDate: '2026-02-26',
  preset: 'vercel',
  srcDir: '.vitepress',
  routeRules: {
    '/api/**': { cors: false },
  },
  esbuild: {
    options: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
  },
});
