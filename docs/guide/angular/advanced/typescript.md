---
title: Typescript - Angular
description: All exported types from the `@lucide/angular` package and how to use them in your Angular project.
---

# TypeScript

List of exported types from the `@lucide/angular` package.
These can be used to type your components when using Lucide icons in a TypeScript Angular project

## Types

### `LucideIcon`

Represents a self-containing Lucide icon component type that has a static `icon` property. You can use this type in schemas that declare an icon property.

```ts
export interface LucideIcon extends Type<LucideIconProps> {
  icon: LucideIconData;
}
```

### `LucideIconData`

A Lucide icon object that fully describes an icon to be displayed.

```ts
export type LucideIconData = {
  name: string;
  node: LucideIconNode[];
  aliases?: string[];
};
```

## Type guards

### `isLucideIconData`

```ts
export function isLucideIconData(icon: unknown): icon is LucideIconData {
  return true | false
}
```

### `isLucideIconComponent`

```ts
export function isLucideIconComponent(icon: unknown): icon is LucideIcon {
  return true | false
}
```
