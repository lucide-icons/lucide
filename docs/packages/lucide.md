# Lucide

Implementation of the lucide icon library for web applications.

## Installation

### Package Managers

```sh
npm install lucide
```

or

```sh
yarn add lucide
```

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

To reduce bundle size, lucide is built to be fully tree-shakable.
The `createIcons` function will search for HTMLElements with the attribute `icon-name` and replace it with the svg from the given icon name.

```html
<!-- Your HTML file -->
<i icon-name="menu"></i>
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

#### Additional Options

In the `createIcons` function you can pass some extra parameters to adjust the `nameAttr` or add custom attributes like for example classes.

Here is a full example:

```js
import { createIcons } from 'lucide';

createIcons({
  attrs: {
    class: ['my-custom-class', 'icon'],
    'stroke-width': 1,
    stroke: '#333'
  },
  nameAttr: 'icon-name' // attribute for the icon name.
});
```

#### Treeshake the library, only use the icons you use

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
