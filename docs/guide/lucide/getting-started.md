---
title: Getting started - Lucide
description: This guide will help you get started with Lucide in your Vanilla JavaScript project.
---
<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactSidebar } from '../../.vitepress/sidebar/react'
</script>

# Getting started

This guide will help you get started with Lucide in your Vanilla JavaScript project.
Make sure you have a your environment set up. If you don't have one yet, you can create a new project using Vite, Parcel or any other boilerplate of your choice.

## Installation

### Package Managers

::: code-group

```sh [pnpm]
pnpm add lucide
```

```sh [yarn]
yarn add lucide
```

```sh [npm]
npm install lucide
```

```sh [bun]
bun add lucide
```

:::

### CDN

#### Script tag (UMD)

```html
<!-- Development version -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

<!-- Production version -->
<script src="https://unpkg.com/lucide@latest"></script>
```

When using the UMD script tag, the library is exposed on the global `lucide` object (for example, `lucide.createIcons()`).

#### ES Modules via CDN

If using native browser ES modules (`<script type="module">`), import the ESM build directly from the CDN:

```html
<i data-lucide="menu"></i>

<script type="module">
  import { createIcons, icons } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';

  createIcons({ icons });
</script>
```

Or import only the specific icons needed for tree-shaking:

```html
<i data-lucide="menu"></i>

<script type="module">
  import { createIcons, Menu, ArrowRight } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';

  createIcons({
    icons: {
      Menu,
      ArrowRight,
    },
  });
</script>
```

We strongly suggest you anchor to a specific version, such as `https://unpkg.com/lucide@x.xxx.x/dist/umd/lucide.min.js` or `https://unpkg.com/lucide@x.xxx.x/dist/esm/lucide.js`, rather than using `@latest`. This ensures reproducible behavior and prevents unexpected breaking changes.

## Importing your first icon

Lucide is built with ES Modules, so it's completely tree-shakable.

The `createIcons` function will search for HTMLElements with the attribute `data-lucide` and replace it with the svg from the given icon name.

### Example

```html
<!-- Your HTML file -->
<i data-lucide="menu"></i>
```

```js
import { createIcons, icons } from 'lucide';

// Caution, this will import all the icons and bundle them.
createIcons({ icons });

// Recommended way, to include only the icons you need.
import { createIcons, Menu, ArrowRight, Globe } from 'lucide';

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe
  }
});
```

## Advanced Usage

### Additional Options

In the `createIcons` function you can pass some extra parameters:

- you can pass `nameAttr` to adjust the attribute name to replace icons (default is `data-lucide`).
- you can pass `attrs` to pass additional custom attributes, for instance CSS classes or stroke options.
- you can pass `root` to provide a custom DOM element the icons should be replaced in (useful when manipulating small sections of a large DOM or elements in the shadow DOM)
- you can pass `inTemplates: true` to also replace icons inside `<template>` tags.

Here is a full example:

```js
import { createIcons } from 'lucide';

createIcons({
  attrs: {
    class: ['my-custom-class', 'icon'],
    'stroke-width': 1,
    stroke: '#333'
  },
  nameAttr: 'data-lucide', // attribute for the icon name.
  root: element, // DOM element to replace icons in.
  inTemplates: true // Also replace icons inside <template> tags.
});
```

### Example using a CDN

```html
<!DOCTYPE html>
<body>
  <i data-lucide="volume-2" class="my-class"></i>
  <i data-lucide="x"></i>
  <i data-lucide="menu"></i>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    lucide.createIcons();
  </script>
</body>
```

