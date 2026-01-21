# Lucide

The core Lucide package for vanilla JavaScript applications. This package allows you to easily add scalable vector icons to any web project without framework dependencies. Perfect for static websites, legacy applications, or when you need lightweight icon integration with maximum browser compatibility.

**What you can accomplish:**
- Add icons to HTML using simple data attributes
- Dynamically create and insert SVG icons with JavaScript
- Customize icon appearance with CSS classes and inline styles
- Tree-shake unused icons to keep bundle sizes minimal
- Use icons in any JavaScript environment or plain HTML

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

```html
<!-- Development version -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

<!-- Production version -->
<script src="https://unpkg.com/lucide@latest"></script>
```

## Usage

### With unpkg

Here is a complete example with unpkg

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

### With ESModules

To reduce bundle size, lucide is built to be fully tree-shakable.
The `createIcons` function will search for HTMLElements with the attribute `data-lucide` and replace it with the svg from the given icon name.

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

- you can pass `nameAttr` to adjust the attribute name to replace for
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

### Treeshake the library, only use the icons you use

```js
import { createIcons, Menu, ArrowRight, Globe } from 'lucide';

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe
  }
});
```

### Custom Document root

Apply icons in a custom root element, for instance a shadow DOM root.

```js
import { createIcons } from 'lucide';

// Custom root element, for instance a shadow DOM root.
const shadowRoot = element.attachShadow({ mode: 'open' });

createIcons({
  root: shadowRoot
});
```

### Apply icons inside `<template>` tags

By default icons inside `<template>` tags are not added.
By setting the `inTemplates` option to `true`, icons inside templates will also be replaced.

```js
import { createIcons } from 'lucide';

createIcons({
  inTemplates: true
});
```

### Custom Element binding

```js
import { createElement, Menu } from 'lucide';

const menuIcon = createElement(Menu); // Returns HTMLElement (svg)

// Append HTMLElement in the DOM
const myApp = document.getElementById('app');
myApp.appendChild(menuIcon);
```

#### Custom Element binding with custom attributes

```js
import { createElement, Menu } from 'lucide';

const menuIcon = createElement(Menu, {
  class: ['my-custom-class', 'icon'],
  'stroke-width': 1,
  stroke: '#333'
}); // Returns HTMLElement (svg)

// Append HTMLElement in the DOM
const myApp = document.getElementById('app');
myApp.appendChild(menuIcon);
```

### With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.
They can be used in the same way as the official icons.

```js
import { coconut } from '@lucide/lab';

createIcons({
  icons: {
    coconut
  }
});
```

## Accessibility

By default, we hide icons from screen readers using `aria-hidden="true"`.

You can add accessibility attributes using aria-labels.

```html
<!DOCTYPE html>
<body>
  <i data-lucide="house" aria-label="Home icon"></i>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    lucide.createIcons();
  </script>
</body>
```

For best practices on accessibility, please see our [accessibility guide](../advanced/accessibility.md).
