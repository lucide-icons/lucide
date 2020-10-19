# Lucide

![NPM](https://img.shields.io/npm/l/lucide)
[![npm](https://img.shields.io/npm/v/lucide)](https://www.npmjs.com/package/lucide)
[![Discord](https://img.shields.io/discord/723074157486800936?label=chat&logo=discord&logoColor=%23ffffff&colorB=%237289DA)](https://discord.gg/EH6nSts)

## What is Lucide?

Lucide is a community-run fork of [Feather Icons](https://github.com/feathericons/feather), open for anyone to contribute icons.

## Table of Contents

* [Installation](#installation)
  * [Package managers](#package-managers)
  * [CDN](#cdn)
* [Usage](#usage)
  * [Unpkg](#with-unpkg)
  * [ESModules](#with-esmodules)
    * [Options](#additional-options)
    * [Threeshake library](#threeshake-the-library-only-use-the-icons-you-use)
    * [Custom binding](#custom-element-binding)
  * [Figma](#figma)
* [Contrbuting](#contributing)
* [Community](#community)
* [License](#license)

## Installation

### Package Managers

``` bash
npm install lucide
#or
yarn add lucide
```

### CDN

``` html
<!-- Development version -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

<!-- Production version -->
<script src="https://unpkg.com/lucide@latest"></script>
```

## Usage

At its core, Lucide is a collection of [SVG](https://svgontheweb.com/#svg) files. This means that you can use Feather icons in all the same ways you can use SVGs (e.g. `img`, `background-image`, `inline`, `object`, `embed`, `iframe`). Here's a helpful article detailing the many ways SVGs can be used on the web: [SVG on the Web – Implementation Options](https://svgontheweb.com/#implementation)

The following are additional ways you can use Lucide.
With the Javascript library you can easily incorporate the icon you want in your webpage.

### With unpkg

Here is a complete example with unpkg

```html
<!DOCTYPE html>
<body>
  <i icon-name="volume-2" class="my-class"></i>
  <i icon-name="x"></i>
  <i icon-name="menu"></i>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    lucide.createIcons();
  </script>
</body>
```

### With ESModules

To reduce bundle size, lucide is build to be fully threeshakeble.
The `createIcons` function will search for HTMLElements with the attribute `icon-name` and replace it with the svg from the given icon name.

```html
<!-- Your HTML file -->
<i icon-name="menu"></i>
```

```js
import { createIcons, icons } from 'lucide';

// Caustion, this will import all the icons and bundle them.
createIcons({icons});

// Recommended way, to include only the icons you need.
import { createIcons, Menu, ArrowRight, Globe } from 'lucide';

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe,
  },
});
```

#### Additional Options

In the `createIcons` function you can pass some extra parameters to adjust the `nameAttr` or add custom attributes like for example classes.

Here is a full example:

```js
import { createIcons } from 'lucide';

createIcons({
  attrs: {
    class: ['my-custom-class', 'icon'],
    'stroke-width': 1,
    stroke: '#333',
  },
  nameAttr: 'icon-name', // atrribute for the icon name.
});
```

#### Threeshake the library, only use the icons you use

```js
import { createIcons, Menu, ArrowRight, Globe } from 'lucide';

createIcons({
  icons: {
    Menu,
    ArrowRight,
    Globe,
  },
});
```

#### Custom Element binding

```js
import { createElement, Menu } from 'lucide';

const menuIcon = createElement(Menu); // Returns HTMLElement (svg)

// set custom attributes with browser native functions
menuIcon.setAttribute('stroke', '#333');
menuIcon.classList.add('my-icon-class');

// Append HTMLElement in webpage
const myApp = document.getElementById('app');
myApp.appendChild(menuIcon);
```

### Figma

You can use the components from [this Figma file](https://www.figma.com/file/g0UipfQlRfGrntKPxZknM7/Featherity).

## Contributing

For more info on how to contribute please see the [contribution guidelines](https://github.com/lucide-icons/lucide/blob/master/CONTRIBUTING.md).

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](https://github.com/lucide-icons/lucide/blob/master/README.md)

## Community

Join the community on our [Discord](https://discord.gg/EH6nSts) server!

## License

Lucide is licensed under the [ISC License](https://github.com/lucide-icons/lucide/blob/master/LICENSE).
