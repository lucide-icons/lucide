# Lucide Static

Static assets and utilities for Lucide icons that work without JavaScript frameworks. This package provides multiple formats including individual SVG files, SVG sprites, icon fonts, and Node.js utilities for server-side rendering and static site generation.

**What you can accomplish:**
- Use individual SVG files as images or CSS background images
- Implement icon fonts for CSS-based icon systems
- Create SVG sprites for efficient icon loading in static sites
- Import SVG strings in Node.js applications and server-side rendering
- Build static websites and applications without JavaScript framework dependencies

This package includes the following implementations of Lucide icons:

- Individual SVG files
- SVG sprite
- Icon font files
- A JavaScript library exporting SVG strings

## Who is this for?

`lucide-static` is suitable for _very specific use cases_ where you want to use Lucide icons without relying on a JavaScript framework or component system. It's ideal for:

- Projects that use icon fonts with plain CSS or utility-first frameworks
- Embedding raw SVG files or sprites directly in HTML
- Using SVGs as CSS background images
- Importing SVG strings into Node.js (CommonJS) environments

::: danger
### Not recommended for production {#production-warning}

SVG sprites and icon fonts include **all icons**, which can significantly increase your app's bundle size and load time.

For production environments, we recommend using a bundler with tree-shaking support to include only the icons you actually use. Consider using:

- [lucide](lucide)
- [lucide-react](lucide-react)
- [lucide-vue](lucide-vue)
- [lucide-vue-next](lucide-vue-next)
- [lucide-angular](lucide-angular)
- [lucide-preact](lucide-preact)
:::

## Installation

::: code-group

```sh [pnpm]
pnpm add lucide-static
```

```sh [yarn]
yarn add lucide-static
```

```sh [npm]
npm install lucide-static
```

```sh [bun]
bun add lucide-static
```

:::

## SVG Files

You can use standalone SVG files or SVG sprites in several ways.

Check out our [codesandbox example](https://codesandbox.io/s/using-the-svg-sprite-lz1kk).

### SVG file as image

#### In HTML:

::: code-group

```html [Webpack]
<!-- SVG file for a single icon -->
<img src="~lucide-static/icons/house.svg" />
```

```html [CDN]
<!-- SVG file for a single icon -->
<img src="https://unpkg.com/lucide-static@latest/icons/house.svg" />
```

:::

#### In CSS:

::: code-group

```css [Webpack]
.house-icon {
  background-image: url(~lucide-static/icons/house.svg);
}
```

```css [CDN]
.house-icon {
  background-image: url(https://unpkg.com/lucide-static@latest/icons/house.svg);
}
```

:::

Make sure you have the correct Webpack loader configured, such as [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/).

### SVG file as string

To import an SVG as a string (e.g., for templating):

::: code-group

```js [Webpack]
import arrowRightIcon from 'lucide-static/icons/arrow-right';
```

```js [Vite]
import arrowRightIcon from 'lucide-static/icons/arrow-right.svg?raw';
```

:::

You'll need an SVG loader like [`svg-inline-loader`](https://v4.webpack.js.org/loaders/svg-inline-loader/).


### Using the SVG sprite

:::danger
[Not intended for production use.](#production-warning)
:::

You may also need an additional SVG loader to handle this.

#### Basic sprite usage (not production-optimized):

```html
<img src="lucide-static/sprite.svg#house" />
```

#### Inline usage:

```html
<svg
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <use href="#alert-triangle" />
</svg>

<!-- sprite SVG -->
<svg>...</svg>
```

#### Inline with CSS helper class

If you'd prefer, you can use CSS to hold your base SVG properties:

```css
.lucide-icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

...and update the SVG as follows:

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="lucide-icon"
>
  <use href="#triangle-alert" />
</svg>

<!-- sprite SVG -->
<svg>...</svg>
```

## Icon font

:::danger
[Not intended for production use.](#production-warning)
:::

Lucide icons are also available as a web font. To use them, you first need to include the corresponding stylesheet:

::: code-group

```css [Vite]
@import 'lucide-static/font/lucide.css';
```

```css [Webpack]
@import ('~lucide-static/font/lucide.css');
```

```html [CDN]
<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css" />
```

```html [Static asset]
<link rel="stylesheet" href="/your/path/to/lucide.css" />
```

:::

Once included, use the format `icon-{kebab-case-name}`. You can copy icon names from the [Lucide Icons page](https://lucide.dev/icons).

```html
<div class="icon-house"></div>
```

If you're not using a package manager, you can download the font files directly from the [latest release](https://github.com/lucide-icons/lucide/releases/latest).

## Node.js

You can also import Lucide icons in Node.js projects:

::: code-group

```js [ESM]
import {MessageSquare} from 'lucide-static';
```

```js [CommonJs]
const {MessageSquare} = require('lucide-static');
```

:::

> Note: Each icon name is in PascalCase.

#### Express app example in Node.js

```js
import express from 'express';
import {MessageSquare} from 'lucide-static';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Page Title</title>
      </head>
      <body>
        <h1>Lucide Icons</h1>
        <p>This is a Lucide icon ${MessageSquare}</p>

      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```
