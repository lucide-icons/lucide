# Lucide Solid integrations

These fixtures exercise the built `lucide-solid` package in real consumer frameworks.

Every fixture runs three checks:

- a framework production build;
- TypeScript with `noEmit`;
- Vitest Browser Mode in Chromium.

From the repository root, install Chromium once and run the complete suite:

```sh
pnpm --filter @lucide/integration-solid-vite exec playwright install chromium
pnpm test:integrations:solid
```

The fixtures depend on `lucide-solid` through `workspace:*`, but import only its public package entry points. The root command builds `lucide-solid` before running any consumer checks.

## Two TypeScript projects per fixture

`tsconfig.json` typechecks the fixture's own sources with `skipLibCheck: true`, like the React fixtures do, because the third-party declarations a Vite app pulls in are not clean under TypeScript 6.

`tsconfig.declarations.json` compiles only `src/IconShowcase.tsx` — the file that imports the public entry points — with `skipLibCheck: false` and no ambient `types`. That makes `tsc` read the declarations shipped in `dist/types` instead of skipping them, so a `.d.ts` that points at a file the build never emitted fails the check. Both run under `pnpm typecheck`.

Note that this does not reproduce the bug fixed in #4846, where the published declarations imported `@lucide/shared/types`: inside the workspace that specifier still resolves through `packages/lucide-solid/node_modules`. Catching that needs a check against the published tarball rather than the workspace link.

## `vite` overrides

`@solidjs/start@2` requires Vite 8, while the rest of the repository is pinned to Vite 7 through the `vite` override in `pnpm-workspace.yaml`. The SolidStart fixture is released from that pin by the parent-scoped `'@lucide/integration-solid-solid-start>vite'` override, which leaves every other package on Vite 7. Because the generic override still rewrites peer ranges inside that subtree, `pnpm peers check` reports unmet `vite` peers there; they are warnings only, and the fixture builds and tests against Vite 8.
