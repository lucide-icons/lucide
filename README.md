# Featherity

[![Discord](https://img.shields.io/discord/723074157486800936?label=chat&logo=discord&logoColor=%23ffffff&colorB=%237289DA)](https://discord.gg/EH6nSts)

## What is Featherity?

Featherity is a fork of [Feather Icons](https://github.com/feathericons/feather), with icons sourced by the community.

## Table of Contents

* [Usage](#usage)
  * [Figma](#figma)
* [Contributing](#contributing)
* [License](#license)

## Installation

### Package Managers

``` bash
npm install featherity
#or
yarn add featherity
```

### CDN

``` html
<!-- Development version -->
<script src="https://unpkg.com/featherity@latest/dist/umd/featherity.js"></script>

<!-- Production version -->
<script src="https://unpkg.com/featherity@latest"></script>
```

## Usage

At its core, Featherity is a collection of [SVG](https://svgontheweb.com/#svg) files. This means that you can use Feather icons in all the same ways you can use SVGs (e.g. `img`, `background-image`, `inline`, `object`, `embed`, `iframe`). Here's a helpful article detailing the many ways SVGs can be used on the web: [SVG on the Web – Implementation Options](https://svgontheweb.com/#implementation)

The following are additional ways you can use Featherity.

### With unpkg

Here is a complete example

```html
<!DOCTYPE html>
<body>
  <i icon-name="volume-2" class="my-class"></i>
  <i icon-name="x"></i>
  <i icon-name="menu"></i>

  <script src="https://unpkg.com/featherity@latest"></script>
  <script>
    featherity.createIcons();
  </script>
</body>
```

### With ESModules

To reduce bundle size, featherity is build to be fully threeshakeble.
The `createIcons` function will search for HTMLElements with the attribute `icon-name` and replace it with the given icon name.

```html
<!-- Your HTML file -->
<i icon-name="menu"></i>
```

```js
import { createIcons, icons } from 'featherity';

// Caustion, this will import all the icons and bundle them.
createIcons({icons});

// Recommended way, to include only the icons you need.
import { createIcons, Menu, ArrowRight, Globe } from 'featherity';

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
import { createIcons, Menu, ArrowRight, Globe } from 'featherity';

createIcons({
  attrs: {
    class: ['my-custom-class', 'icon'],
    'stroke-width': 1,
    stroke: '#333',
  },
  nameAttr: 'icon-name', // atrribute for the icon name.
  icons: {
    Menu,
    ArrowRight,
    Globe,
  },
});
```

#### Custom Element binding

```js
import { createElement, Menu } from 'featherity';

const menuIcon = createElement(Menu);

document.appendChild(menuIcon);
```



### Figma

You can use the components from [this Figma file](https://www.figma.com/file/g0UipfQlRfGrntKPxZknM7/Featherity).

## Contributing

For more info on how to contribute please see the [contribution guidelines](https://github.com/featherity/featherity/blob/master/CONTRIBUTING.md).

Caught a mistake or want to contribute to the documentation? [Edit this page on Github](https://github.com/featherity/featherity/blob/master/README.md)

## Community

Do you want to join our community?
Join us in [discord](https://discord.gg/EH6nSts)!

## License

Feather is licensed under the [ISC License](https://github.com/featherity/featherity/blob/master/LICENSE).
