---
title: Typescript - Angular
description: All exported types from the `@lucide/angular` package and how to use them in your Angular project.
---

# TypeScript

List of exported types from the `@lucide/angular` package.
These can be used to type your components when using Lucide icons in a TypeScript Angular project

## Types

### `LucideIconProps`

Exports all props that can be passed to an icon component.

```ts
interface LucideIconProps {
  title: Signal<Nullable<string>>;
  size: Signal<Nullable<number>>;
  color: Signal<Nullable<string>>;
  strokeWidth: Signal<Nullable<number>>;
  absoluteStrokeWidth: Signal<Nullable<boolean>>;
}
```

### `LucideIcon`

Represents a Lucide icon component type that has `iconName` and `iconData` signals inherited from `LucideIconBase` and respective static members accessible without instantiating the component.

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
