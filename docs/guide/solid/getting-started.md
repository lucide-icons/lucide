---
title: Getting started - Solid
description: This guide will help you get started with Lucide in your Solid project.
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { solidSidebar } from '../../.vitepress/sidebar/solid'
</script>

# Getting started

This guide will help you get started with Lucide in your Solid project.
Make sure you have a Solid environment set up. If you don't have one yet, you can create a new Solid project using Create Solid App, Vite, or any other Solid boilerplate of your choice.

## Installation

::: code-group

```sh [pnpm]
pnpm add lucide-solid
```

```sh [yarn]
yarn add lucide-solid
```

```sh [npm]
npm install lucide-solid
```

```sh [bun]
bun add lucide-solid
```

:::

:::: info Using Solid 2?

Lucide ships one package per major Solid version. This guide covers **Solid 1** and the `lucide-solid` package. If your app is on Solid 2, install `@lucide/solid` instead:

::: code-group

```sh [pnpm]
pnpm add @lucide/solid
```

```sh [yarn]
yarn add @lucide/solid
```

```sh [npm]
npm install @lucide/solid
```

```sh [bun]
bun add @lucide/solid
```

:::

Both packages export the same icon components with the same props, so the rest of this guide applies unchanged — only the import specifier differs:

```jsx
import { Camera } from '@lucide/solid';
```

What does differ is Solid itself. The changes most likely to affect the code you write around Lucide:

| | `lucide-solid` | `@lucide/solid` |
| -------------------- | ----------------------------- | ----------------------- |
| Solid version         | `^1.4.7`                      | `^2.0.0-rc.0`           |
| DOM runtime package   | `solid-js/web`                | `@solidjs/web`          |
| `jsxImportSource`     | `solid-js`                    | `@solidjs/web`          |
| Splitting icon props  | `splitProps(props, ['size'])` | `omit(props, 'size')`   |
| Providing context     | `<Ctx.Provider value={…}>`    | `<Ctx value={…}>`       |

See the [Solid 2 migration guide](https://github.com/solidjs/solid/blob/next/documentation/solid-2.0/MIGRATION.md) for the full list.

Solid 2 is still a release candidate, so treat `@lucide/solid` as pre-release too. The live examples throughout this guide run on Solid 1.

::::

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Solid component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

```jsx
import { Camera } from 'lucide-solid';

// Usage
const App = () => {
  return <Camera />;
};

export default App;
```

## Props

To customize the appearance of an icon, you can use the following props:

| name               | type      | default      |
| ------------------ | --------- | ------------ |
| `size`             | _number_  | 24           |
| `color`            | _string_  | currentColor |
| `strokeWidth`      | _number_  | 2            |
| `nonScalingStroke` | _boolean_ | false        |

Because icons render as SVG elements, all standard SVG attributes can also be applied as props. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return (
    <Camera
      size={48}
      color="red"
      strokeWidth={1}
    />
  );
};
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in solidSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
