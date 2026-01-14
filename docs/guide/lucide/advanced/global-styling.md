<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue';
</script>

## Global styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use the `attrs` option in `createIcons`.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
<!-- Local overwrite NOT working -->
<!-- But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to adjust the global styles using `attrs` in `createIcons`. -->

This will apply the `color`, `size` and `strokeWidth` props to all icons.

### Style by using attrs on `createIcons`

You can also apply global styles by passing attributes to the `createIcons` function.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <i data-lucide="building"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";

import { createIcons, Building } from 'lucide/dist/cjs/lucide';

createIcons({
  attrs: {
    'stroke-width': 1,
    stroke: 'lightblue',
  },
  icons: {
    Building,
  }
});

```

:::

### Style by using CSS

Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide"}

```css icon.css [active]
.lucide {
  /* Change this! */
  color: #ffadff;
  width: 48px;
  height: 48px;
  stroke-width: 1px;
}

.app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <div class="app">
      <i data-lucide="cake-slice"></i>
      <i data-lucide="candy"></i>
      <i data-lucide="apple"></i>
      <i data-lucide="cookie"></i>
      <i data-lucide="martini"></i>
      <i data-lucide="ice-cream-2"></i>
      <i data-lucide="sandwich"></i>
      <i data-lucide="wine"></i>
      <i data-lucide="dessert"></i>
    </div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";
import "./icon.css";

import {
  createIcons,
  CakeSlice,
  Candy,
  Apple,
  Cookie,
  Martini,
  IceCream2,
  Sandwich,
  Wine,
  Dessert
} from 'lucide/dist/cjs/lucide';

createIcons({
  icons: {
    CakeSlice,
    Candy,
    Apple,
    Cookie,
    Martini,
    IceCream2,
    Sandwich,
    Wine,
    Dessert,
  }
});

```

:::
