---
title: Getting started - Preact
description: This guide will help you get started with Lucide in your Preact project.
---
<script setup lang="ts">
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { preactSidebar } from '../../.vitepress/sidebar/preact'
</script>

# Getting started

This guide will help you get started with Lucide in your Preact project.
Make sure you have a Preact environment set up. If you don't have one yet, you can create a new Preact project using Create Preact App, Vite, or any other Preact boilerplate of your choice.

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-preact
```

```sh [yarn]
yarn add lucide-preact
```

```sh [npm]
npm install lucide-preact
```

```sh [bun]
bun add lucide-preact
```

:::

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Preact component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Camera } from 'lucide-preact';

// Usage
const App = () => {
  return <Camera color="red" size={48} />;
};

export default App;
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return <Camera size={48} fill="red" />;
};
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in preactSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
