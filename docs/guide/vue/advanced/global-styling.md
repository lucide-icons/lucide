<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

Lucide Vue provides a context API called `setLucideProps` that allows you to set global default properties for all Lucide icons in your application.
This is useful if you want all icons to share the same size, color, or stroke width by default.

### Setting global defaults

You can call `setLucideProps` in your main entry file or in a top-level component to set the default properties for all icons.

```js
import { setLucideProps } from '@lucide/vue';

setLucideProps({
  size: 32,
  color: '#4f46e5',
  strokeWidth: 1.5,
});
```

## Style by using CSS

Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

::: sandpack {template=vue editorHeight=300 editorWidthPercentage=55 dependencies="lucide-vue-next"}

```css src/icon.css [active]
.lucide {
  /* Change this! */
  color: #ffadff;
  width: 56px;
  height: 56px;
  stroke-width: 1px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```vue src/App.vue
<script setup>
import {
  CakeSlice,
  Candy,
  Apple,
  Cookie,
  Martini,
  IceCream2,
  Sandwich,
  Wine,
  Dessert,
} from "lucide-vue-next";

import "./icon.css";
</script>

<template>
  <div class="grid">
    <CakeSlice />
    <Candy />
    <Apple />
    <Cookie />
    <Martini />
    <IceCream2 />
    <Sandwich />
    <Wine />
    <Dessert />
  </div>
</template>
```
:::

### Absolute stroke width

For global absolute stroke width styling the `vector-effect: non-scaling-stroke` CSS property can be applied to the children. This will keep the stroke-width the same size no matter the size of the icon. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more info.

::: sandpack {template=vue editorHeight=300 editorWidthPercentage=55 dependencies="lucide-vue-next"}

```css src/icon.css [active]
.lucide {
  width: 48px;
  height: 48px;
  stroke-width: 1.5;
}

.lucide * {
  vector-effect: non-scaling-stroke;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```vue src/App.vue
<script setup>
import {
  TentTree,
  Caravan,
  FlameKindling,
  MountainSnow,
  Trees,
  Axe,
  Map,
  CloudMoon,
  Sparkles,
} from "lucide-vue-next";

import "./icon.css";
</script>

<template>
  <div class="grid">
    <TentTree />
    <Caravan />
    <FlameKindling />
    <MountainSnow />
    <Trees />
    <Axe />
    <Map />
    <CloudMoon />
    <Sparkles />
  </div>
</template>

```
:::
