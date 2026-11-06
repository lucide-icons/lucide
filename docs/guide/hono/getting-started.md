---
title: Getting started - Hono
description: This guide will help you get started with Lucide in your Hono project.
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { honoSidebar } from '../../.vitepress/sidebar/hono'
</script>

# Getting started

This guide will help you get started with Lucide in your Hono project.
Make sure you have a Hono project set up with [JSX enabled](https://hono.dev/docs/guides/jsx#settings). If you don't have one yet, you can create one with `npm create hono@latest`.

## Installation

::: code-group

```sh [pnpm]
pnpm add @lucide/hono
```

```sh [yarn]
yarn add @lucide/hono
```

```sh [npm]
npm install @lucide/hono
```

```sh [bun]
bun add @lucide/hono
```

:::

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Hono JSX component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

```tsx
import { Hono } from 'hono';
import { Camera } from '@lucide/hono';

const app = new Hono();

app.get('/', (c) => {
  return c.html(<Camera />);
});

export default app;
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

```tsx
import { Camera } from '@lucide/hono';

const Page = () => {
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
  <OverviewLink v-for="item in honoSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
