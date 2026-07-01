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

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

Because icons render as SVG elements, all standard SVG attributes can also be applied as props. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return <Camera size={48} color="red" strokeWidth={1} />;
};
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in solidSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
