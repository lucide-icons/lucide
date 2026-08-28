---
title: Getting started - Vue
description: This guide will help you get started with Lucide in your Vue project.
---
<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { vueSidebar } from '../../.vitepress/sidebar/vue'
</script>

# Getting started

This guide will help you get started with Lucide in your Vue project.
Make sure you have a Vue environment set up. If you don't have one yet, you can create a new Vue project using Vite, or any other Vue boilerplate of your choice.

## Installation

::: code-group

```sh [pnpm]
pnpm add @lucide/vue
```

```sh [yarn]
yarn add @lucide/vue
```

```sh [npm]
npm install @lucide/vue
```

```sh [bun]
bun add @lucide/vue
```

:::

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Vue component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

```vue
<script setup>
import { Camera } from '@lucide/vue';
</script>

<template>
  <Camera />
</template>
```

## Props

To customize the appearance of an icon, you can use the following props:

|  name                   |   type    |  default     |
| ----------------------- | --------- | ------------ |
| `size`                  | *number*  | 24           |
| `color`                 | *string*  | currentColor |
| `stroke-width`          | *number*  | 2            |
| `absoluteStrokeWidth`   | *boolean* | false        |
| `default-class`         | *string*  | lucide-icon  |

### Applying props

Because icons render as SVG elements, all standard SVG attributes can also be applied as props. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```vue
<template>
  <Camera :size="48" color="red" :stroke-width="1" />
</template>
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in vueSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
