# Lucide React integrations

These fixtures exercise the built `lucide-react` package in real consumer frameworks.

Every fixture runs three checks:

- a framework production build;
- TypeScript with `noEmit`;
- Vitest Browser Mode in Chromium.

From the repository root, install Chromium once and run the complete suite:

```sh
pnpm --filter @lucide/integration-react-vite exec playwright install chromium
pnpm test:integrations:react
```

The fixtures depend on `lucide-react` through `workspace:*`, but import only its public package entry points. The root command builds `lucide-react` before running any consumer checks.
