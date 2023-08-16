import { defineNitroConfig } from "nitropack";

export default defineNitroConfig({
  preset: 'vercel-edge',
  srcDir: '.vitepress',
  routeRules: {
    '/api/**': { cors: false },
  },
  esbuild: {
    options: {
      include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
      loaders: {
        '.js': 'js',
        '.jsx': 'jsx',
        '.ts': 'ts',
        '.tsx': 'tsx',
      }
    },
  },
})
