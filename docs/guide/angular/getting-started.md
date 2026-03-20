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
Make sure you have an Angular environment set up. If you don't have one yet, you can [create a new Angular project](https://angular.dev/installation#create-a-new-project) using `@angular/cli`.

## Prerequisites

This package requires Angular 17+ and uses standalone components, signals, and zoneless change detection.

## Installation

::: code-group

```sh [pnpm]
pnpm add @lucide/angular
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

### Standalone icons

```ts
import { Component } from '@angular/core';
import { LucideFileText } from '@lucide/angular';

@Component({
  selector: 'app',
  template: '<svg lucideFileText></svg>',
  imports: [LucideFileText],
})
export class App { }
```

### Dynamic icon component

When you need to render icons dynamically (for example in a list of menu items or based on a boolean signal), you can use the `LucideDynamicIcon` component:

```ts
import { Component, computed, signal } from '@angular/core';
import { LucideDynamicIcon, LucideCircleCheck, LucideCircleX } from '@lucide/angular';

@Component({
  selector: 'app',
  template: `<svg [lucideIcon]="icon()"></svg>`,
  imports: [LucideDynamicIcon],
})
export class App {
  protected readonly model = signal<boolean>(true);
  protected readonly icon = computed(() => this.model() ? LucideCircleCheck : LucideCircleX);
}
```

## Component inputs

To customize the appearance of an icon, you can use the following inputs:

|  name                   |   type    |  default     |
| ----------------------- | --------- | ------------ |
| `size`                  | *number*  | 24           |
| `color`                 | *string*  | currentColor |
| `strokeWidth`           | *number*  | 2            |
| `absoluteStrokeWidth`   | *boolean* | false        |
| `title`                 | *string*  | null         |

Because icons render as SVG elements, all standard SVG attributes can also be applied. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```html
<svg lucideHouse [size]="48" color="red" [strokeWidth]="1" title="Home"></svg>
```

For more examples and details on how to use these inputs, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in angularSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
