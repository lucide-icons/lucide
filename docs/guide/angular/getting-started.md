---
title: Getting started - Angular
description: This guide will help you get started with Lucide in your Angular project.
---
<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { angularSidebar } from '../../.vitepress/sidebar/angular'
</script>

# Getting started

This guide will help you get started with Lucide in your Angular project.
Make sure you have a Angular environment set up. If you don't have one yet, you can create a new Angular project using Vite, or any other Angular boilerplate of your choice.

## Prerequisites

This package requires Angular 17+ and uses standalone components, signals, and zoneless change detection.

## Installation

::: code-group

```sh [pnpm]
pnpm install @lucide/angular
```

```sh [yarn]
yarn add @lucide/angular
```

```sh [npm]
npm install @lucide/angular
```

```sh [bun]
bun add @lucide/angular
```

:::

## Importing your first icon

This library is built with standalone components, so it's completely tree-shakable.

Every icon can be imported as a ready-to-use standalone component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

```ts
import { Component } from '@angular/core';
import { LucideFileText } from '@lucide/angular';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  imports: [LucideFileText],
})
export class App { }
```

```html
<svg lucideFileText></svg>
```

## Props

To customize the appearance of an icon, you can use the following props:

|  name                   |   type    |  default     |
| ----------------------- | --------- | ------------ |
| `size`                  | *number*  | 24           |
| `color`                 | *string*  | currentColor |
| `stroke-width`          | *number*  | 2            |
| `absoluteStrokeWidth`   | *boolean* | false        |

Because icons render as SVG elements, all standard SVG attributes can also be applied as props. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```html
<svg lucideHouse size="48" color="red" strokeWidth="1"></svg>
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in angularSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
