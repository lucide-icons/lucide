// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    // `nuxt typecheck` only covers `app/**` and `tests/nuxt/**` by default; opt the browser spec
    // and the vitest config in so they are type-checked too.
    tsConfig: { include: ['../tests/**/*'] },
    nodeTsConfig: { include: ['../vitest.config.*'] },
  },
});
