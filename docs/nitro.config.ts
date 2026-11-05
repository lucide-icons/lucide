export default defineNitroConfig({
  compatibilityDate: '2026-02-26',
  preset: 'vercel',
  srcDir: '.vitepress',
  ignore: ['.vitepress/plugins'],
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
