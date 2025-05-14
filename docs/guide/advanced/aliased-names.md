# Aliased Names

Icons can have multiple names for the same icon. This is because we choose to rename some icons to make them more consistent with the rest of the icon set, or the name was not generic. For example, the `edit-2` icon is renamed to `pen` to make the name more generic, since it is just a pen icon.

Beside aliases names lucide also includes prefixed and suffixed names to use within your project. This is to prevent import name collisions with other libraries or your own code.

```tsx
// These are all the same icon
import {
  House,
  HouseIcon,
  LucideHouse,
} from "lucide-react";
```

## Choosing import name style

To be consistent in your imports or want to change the autocompletion of Lucide icons in your IDE there an option to able the choose the import name style you want.

This can be done by creating a custom module declaration file to override the lucide imports and turning off the autocomplete in your IDE.

### Turn off autocomplete in your IDE

```json [.vscode/settings.json]
{
  "typescript.preferences.autoImportFileExcludePatterns": [
    "lucide-react", // or
    "lucide-preact", // or
    "lucide-react-native", // or
    "lucide-vue-next",
  ]
}
```

### Create a custom module declaration file

Only available for `lucide-react`, `lucide-preact`, `lucide-react-native`, `lucide-vue-next` package.
This will enable you to choose the import name style you want to use in your project.

::: code-group

```ts [React]
declare module "lucide-react" {
  // Prefixed import names
  export * from "lucide-react/dist/lucide-react.prefixed";
  // or
  // Suffixed import names
  export * from "lucide-react/dist/lucide-react.suffixed";
}
```

```ts [Vue]
declare module "lucide-vue-next" {
  // Prefixed import names
  export * from "lucide-vue-next/dist/lucide-vue-next.prefixed";
  // or
  // Suffixed import names
  export * from "lucide-vue-next/dist/lucide-vue-next.suffixed";
}
```

```ts [Preact]
declare module "lucide-preact" {
  // Prefixed import names
  export * from "lucide-preact/dist/lucide-preact.prefixed";
  // or
  // Suffixed import names
  export * from "lucide-preact/dist/lucide-preact.suffixed";
}
```

```ts [React Native]
declare module "lucide-react-native" {
  // Prefixed import names
  export * from "lucide-react-native/dist/lucide-react-native.prefixed";
  // or
  // Suffixed import names
  export * from "lucide-react-native/dist/lucide-react-native.suffixed";
}
```

```ts [@lucide-icons]
declare module "@lucide/icons" {
  // Prefixed import names
  export * from "@lucide/icons/dist/lucide-icons.prefixed";
  // or
  // Suffixed import names
  export * from "@lucide/icons/dist/lucide-icons.suffixed";
}
```

:::

Place this in your project root or in a folder where your tsconfig.json is located, or locate it in your defined type directory.
Easiest way is to create a `@types` folder in your project root and name the file `[package-name].d.ts`.

### Import name styles

| Import Style  | Available imports           | Declaration file import |
| ------------- | --------------------------- | ----------------------- |
| Default       | Home, HomeIcon, LucideHome  |                         |
| Prefixed      | LucideHome                  | [package].prefixed      |
| Suffixed      | HomeIcon                    | [package].suffixed      |
