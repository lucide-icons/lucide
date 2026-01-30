---
title: Getting started - Astro
description: This guide will help you get started with Lucide in your Astro project.
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { astroSidebar } from '../../.vitepress/sidebar/astro'
</script>

# Getting started

This guide will help you get started with Lucide in your astro project.
Make sure you have a astro environment set up. If you don't have one yet, you can create a new astro project using Vite, or any other astro boilerplate of your choice.

## Installation

::: code-group

```sh [pnpm]
pnpm install @lucide/astro
```

```sh [yarn]
yarn add @lucide/astro
```

```sh [npm]
npm install @lucide/astro
```

```sh [bun]
bun add @lucide/astro
```

:::

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as an Astro component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```astro
---
import { Camera } from '@lucide/astro';
---

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

```astro
---
import { Camera } from '@lucide/astro';
---

<Camera color="#ff3e98" />
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in astroSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
