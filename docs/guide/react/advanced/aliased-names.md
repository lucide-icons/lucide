---
title: Aliased Names - React
description: Learn about the different import name styles available for Lucide icons in your React project and how to choose the one that best fits your needs.
---
# Aliased Names

Some icons have multiple names. This is because we sometimes choose to rename them to make them more consistent with the rest of the icon set, or the name was not generic. For example, the `edit-2` icon is renamed to `pen` to make the name more generic, since it is just a pen icon.

Beside these aliases, Lucide also includes prefixed and suffixed names to use within your project. This is to prevent import name collisions with other libraries or your own code.

```tsx
// These are all the same icon
import {
  House,
  HouseIcon,
  LucideHouse,
} from "lucide-react";
```

## Choosing import name style

If you want consistent imports across your project, or if you want to change the autocompletion of Lucide icons in your IDE, there an option to choose the import name style you prefer.

This can be done by creating a custom module declaration file to override Lucide imports and turning off the autocomplete in your IDE.

### Turn off autocomplete in your IDE

```json [.vscode/settings.json]
{
  "js/ts.preferences.autoImportFileExcludePatterns": [
    "lucide-react",
  ]
}
```

### Create a custom module declaration file

Create a custom TypeScript declaration file that re-exports the preferred naming style:

```ts [lucide-react.d.ts]
declare module "lucide-react" {
  // Prefixed import names
  export * from "lucide-react/dist/lucide-react.prefixed";
  // or
  // Suffixed import names
  export * from "lucide-react/dist/lucide-react.suffixed";
}
```

Place this file in your project root or in a directory included in your TypeScript configuration.
A common approach is to create a `@types` folder and name the file `lucide-react.d.ts`.

### Import name styles

| Import Style  | Available imports           | Declaration file import |
| ------------- | --------------------------- | ----------------------- |
| Default       | Home, HomeIcon, LucideHome  |                         |
| Prefixed      | LucideHome                  | lucide-react.prefixed   |
| Suffixed      | HomeIcon                    | lucide-react.suffixed   |
