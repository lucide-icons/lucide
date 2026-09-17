# Lucide Vue integrations

These fixtures exercise the built `@lucide/vue` package in real consumer frameworks.

Every fixture runs three checks:

- a framework production build;
- TypeScript with `vue-tsc` (`noEmit`);
- Vitest Browser Mode in Chromium.

From the repository root, install Chromium once and run the complete suite:

```sh
pnpm --filter @lucide/integration-vue-vite exec playwright install chromium
pnpm test:integrations:vue
```

The fixtures depend on `@lucide/vue` through `workspace:*`, but import only its public package entry point. The root command builds `@lucide/vue` before running any consumer checks.
