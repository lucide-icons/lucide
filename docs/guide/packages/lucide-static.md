# Lucide Static

This package include the following lucide implementations:

- All SVG files
- SVG sprite
- Icon fonts
- JavaScript library containing strings of SVGs.

## Why lucide-static?

This package is suitable for specific use cases, for example if you want to use icon fonts, SVG sprites, normal SVGs or Common.js SVG strings in your javascript project.

::: warning
While they can be useful for prototyping, it is not recommended to use the SVG sprites or icon fonts provided by this package in production web apps as all the available icons are included in the app, hence increasing loading time and data usage. We recommend to use a bundler and tree-shaking to make sure only the icons you use are bundled with your app. Tree-shaking is only available in these packages: [lucide](lucide), [lucide-react](lucide-react), [lucide-vue](lucide-vue), [lucide-vue-next](lucide-vue-next), [lucide-angular](lucide-angular), [lucide-preact](lucide-preact)
:::

## Installation

## Package Managers

::: code-group

```sh [pnpm]
pnpm install lucide-static
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

### CDN

```html
<!-- SVG file for a single icon -->
<img src="https://unpkg.com/lucide-static@latest/icons/house.svg" />

<!-- Icon font -->
<style>
  @font-face {
    font-family: 'LucideIcons';
    src: url(https://unpkg.com/lucide-static@latest/font/Lucide.ttf) format('truetype');
  }
</style>
```

## Usage

Check out the [codesandbox examples](https://codesandbox.io/s/using-the-svg-sprite-lz1kk).

### SVG Files

#### SVG file as image

To use it in for example html:

```html
<!-- SVG file for a single icon -->
<img src="~lucide-static/icons/house.svg" />
```

```css
.house-icon {
  background-image: url(~lucide-static/icons/house.svg);
}
```

Make sure you have the correct webpack loaders to make this work. [url-loader](https://v4.webpack.js.org/loaders/url-loader/)

#### SVG file as string

You can simply import each SVG by targeting `lucide-static/icons/{icon-name}.svg`.
To use SVGs in your project you can for example use a [SVG loader](https://v4.webpack.js.org/loaders/svg-inline-loader/).

```js
import arrowRightIcon from 'lucide-static/icons/arrow-right';

// return string of an SVG
```

### SVG Sprite

You may need additional loader for this.

```html
<!-- Icon Sprite, not recommended for production! -->
<img src="lucide-static/sprite.svg#house" />

<!-- or -->
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

<svg>
  ...sprite svg
</svg>
```

If you'd prefer, you can use CSS to hold your base SVG properties

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

and update the SVG as follows

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="lucide-icon"
>
<use
    href="#alert-triangle"
  />
</svg>
<svg>
  ...sprite svg
</svg>
```

### Icon Font

```css
@import ('~lucide-static/font/lucide.css');
```

```html
<div class="icon-house"></div>
```

### Node.js

To use lucide icons in your Nodejs project you can import each icon as:

```js
const { messageSquare } = require('lucide-static/lib');
```

> Note: Each icon name is in camelCase.

#### Example in node.js project

```js
const express = require('express');
const { messageSquare } = require('lucide-static/lib');
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
        <p>This is a lucide icon ${messageSquare}</p>

      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```
