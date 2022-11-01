# Lucide Static

This package include the following lucide implementations:

- All svg files
- Javascript library containing strings of svgs.
- Icon fonts
- Svg sprite

> What is lucide? Read it [here](https://github.com/lucide-icons/lucide#what-is-lucide).

## Why lucide-static?

This package is suitable for very specific use cases for example if you want to use icon fonts, svg sprites, normal svgs or Common.js Svg strings in your javascript project.

> ⚠️ It is not recommended to use this package for svg sprites or icon fonts for web pages/applications, for prototyping it is ok. We recommend to bundlers for web applications to make sure you only bundle the used icons from this icon library (Threeshaking). Otherwise it will load all the icons, making you webpage loading slower. Threeshaking is only available in the packages: [lucide](https://github.com/lucide-icons/lucide/tree/main/packages/lucide), [lucide-react](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react), [lucide-vue](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-vue), [lucide-vue-next](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-vue-next), [lucide-angular](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-angular), [lucide-preact](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-preact)

## Installation

## Package Managers

```sh
yarn add lucide-static
```

or

```sh
npm install lucide-static
```

### CDN

```html
<!-- Svg File -->
<img src="https://unpkg.com/lucide-static@latest/icons/home.svg" />

<!-- Icon Font -->
<style>
  @font-face {
    font-family: 'LucideIcons';
    src: url(https://unpkg.com/lucide-static@latest/font/Lucide.ttf) format('truetype');
  }
</style>
```

## Usage

Checkout the [codesandbox examples](https://codesandbox.io/s/using-the-svg-sprite-lz1kk).

### SVG Files

#### Svg file as image

To use it in for example html:

```html
<!-- Svg File -->
<img src="~lucide-static/icons/home.svg" />
```

```css
.home-icon {
  background-image: url(~lucide-static/icons/home.svg);
}
```

Make sure you have the correct webpack loaders to make this work. [url-loader](https://v4.webpack.js.org/loaders/url-loader/)

#### Svg file Inline

You can simply import each svg by targeting `lucide-static/icons/{icon-name}.svg`.
To use svgs in your project you can for example use a [svg loader](https://v4.webpack.js.org/loaders/svg-inline-loader/).

```js
import arrowRightIcon from 'lucide-static/icons/arrow-right';

// return string of a svg
```

### SVG Sprite

You may need additional loader for this.

```html
<!-- Icon Sprite, not recommended for production! -->
<img src="lucide-static/sprite.svg#home" />

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

<svg>...sprite svg</svg>
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

and update the svg as follows

```svg
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
@import ('~lucide-static/font/Lucide.css');
```

```html
<div class="icon-home"></div>
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

## Contributing

For more info on how to contribute please see the [contribution guidelines](https://github.com/lucide-icons/lucide/blob/main/CONTRIBUTING.md).

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](https://github.com/lucide-icons/lucide/blob/main/README.md)

## Community

Join the community on our [Discord](https://discord.gg/EH6nSts) server!

## License

Lucide is totally free for commercial use and personally use, this software is licensed under the [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE).
