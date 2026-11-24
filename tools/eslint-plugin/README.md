# @lucide/eslint-plugin

A internal used package with the ESLint plugins and formatter used to lint the Lucide repository. They are wired up in the root `eslint.config.js`.

- `svg`: a strict SVG parser and rules for what an icon in `icons/*.svg` may contain (`svg/no-text`, `svg/allowed-elements`, `svg/allowed-attrs`, `svg/allowed-attr-values`, `svg/require-attrs`). How an icon is formatted is left to Prettier.
- `jsonSchema`: `json-schema/no-invalid`, which validates the icon, category and group JSON files against their JSON Schema.
- `src/githubFormatter.ts`: an ESLint formatter that prints problems as GitHub Actions annotations.

## Scripts

```sh
pnpm --filter @lucide/eslint-plugin test
pnpm --filter @lucide/eslint-plugin typecheck
```
