export default defineNitroConfig({
  compatibilityDate: '2026-02-26',
  preset: 'vercel',
  vercel: {
    // Sets the `__vdpl` cookie on page loads, so Vercel serves later asset and page chunk
    // requests from the same deployment. Needs Skew Protection enabled in the Vercel project.
    skewProtection: true,
  },
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
