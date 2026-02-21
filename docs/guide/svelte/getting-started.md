---
title: Getting started - Svelte
description: This guide will help you get started with Lucide in your Svelte project.
---
<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { svelteSidebar } from '../../.vitepress/sidebar/svelte'
</script>

# Getting started

This guide will help you get started with Lucide in your Svelte project.
Make sure you have a Svelte environment set up. If you don't have one yet, you can create a new Svelte project using Vite, or any other Svelte boilerplate of your choice.

## Installation

::: code-group

```sh [pnpm]
pnpm install @lucide/svelte
```

```sh [yarn]
yarn add @lucide/svelte
```

```sh [npm]
npm install @lucide/svelte
```

```sh [bun]
bun add @lucide/svelte
```

:::

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Svelte component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```svelte
<script>
  import Camera from '@lucide/svelte/icons/camera';
</script>

<Camera />
```

## Props

|  name                   |   type    |  default     |
| ----------------------- | --------- | ------------ |
| `size`                  | *number*  | 24           |
| `color`                 | *string*  | currentColor |
| `stroke-width`          | *number*  | 2            |
| `absoluteStrokeWidth`   | *boolean* | false        |
| `default-class`         | *string*  | lucide-icon  |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```svelte
<script>
  import Camera from '@lucide/svelte/icons/camera';
</script>

<Camera fill="red" />
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in svelteSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
