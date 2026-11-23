# Lucide Svelte integrations

These fixtures exercise the built `@lucide/svelte` package in real consumer frameworks.

Every fixture runs three checks:

- a framework production build;
- TypeScript with `svelte-check` (`noEmit`);
- Vitest Browser Mode in Chromium.

From the repository root, install Chromium once and run the complete suite:

```sh
pnpm --filter @lucide/integration-svelte-vite exec playwright install chromium
pnpm test:integrations:svelte
```

The fixtures depend on `@lucide/svelte` through `workspace:*`, but import only its public package entry point. The root command builds `@lucide/svelte` before running any consumer checks.
