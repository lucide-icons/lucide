// Vercel BotID loads its challenge through these first-party paths (same as `botid/nuxt`).
const BOTID_BASE = '/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3';
const BOTID_SERVER = 'https://api.vercel.com/bot-protection';

export default defineNitroConfig({
  compatibilityDate: '2026-02-26',
  preset: 'vercel',
  srcDir: '.vitepress',
  ignore: ['.vitepress/plugins'],
  routeRules: {
    '/api/**': { cors: false },
  },
  vercel: {
    config: {
      routes: [
        { src: `^${BOTID_BASE}/a-4-a/c\\.js$`, dest: `${BOTID_SERVER}/v1/challenge` },
        // Nitro's route type doesn't allow `headers` next to `dest`, Vercel's routing schema does.
        {
          src: `^${BOTID_BASE}/(.*)$`,
          dest: `${BOTID_SERVER}/v1/proxy/$1`,
          headers: { 'X-Frame-Options': 'SAMEORIGIN' },
        } as { src: string; dest: string },
      ],
    },
  },
  esbuild: {
    options: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
  },
});
