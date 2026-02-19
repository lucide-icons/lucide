<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { angularSidebar } from '../../.vitepress/sidebar/angular'
</script>

# Getting started

This guide will help you get started with Lucide in your Vue project.
Make sure you have a Vue environment set up. If you don't have one yet, you can create a new Vue project using Vite, or any other Vue boilerplate of your choice.

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

### Example

Additional props can be passed to adjust the icon:

```ts
import { Component } from '@angular/core';
import { LucideFileText } from '@lucide/angular';

@Component({
  selector: 'app-foobar',
  templateUrl: './foobar.html',
  imports: [LucideFileText],
})
export class Foobar { }
```

```html
<svg lucideFileText></svg>
```

## Props

|  name                   |   type    |  default     |
| ----------------------- | --------- | ------------ |
| `size`                  | *number*  | 24           |
| `color`                 | *string*  | currentColor |
| `stroke-width`          | *number*  | 2            |
| `absoluteStrokeWidth`   | *boolean* | false        |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```html
<svg lucideHouse size="48" color="red" strokeWidth="1"></svg>
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in angularSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
