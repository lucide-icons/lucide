---
title: Global Styling - Solid
description: Learn how to style all Lucide icons globally in your Solid application using CSS or the Lucide context provider.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

For global styling using a context provider, you can use the `LucideProvider` component that is provided by the `lucide-solid` package.

<!-- TODO: Replace this with new package -->

```tsx
import { LucideProvider, Home } from 'lucide-solid';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

This will apply the `color`, `size` and `strokeWidth` props to all icons that are children of the `LucideProvider`.


## Style by using CSS
Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

::: sandpack {template=vite-solid editorHeight=300 editorWidthPercentage=60 dependencies="lucide-solid"}

```css icon.css [active]
.lucide {
  /* Change this! */
  color: #ffadff;
  width: 48px;
  height: 48px;
  stroke-width: 1px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 6px;
}
```

```tsx App.tsx
import CakeSlice from 'lucide-solid/icons/cake-slice';
import Candy from 'lucide-solid/icons/candy';
import Apple from 'lucide-solid/icons/apple';
import Cookie from 'lucide-solid/icons/cookie';
import Martini from 'lucide-solid/icons/martini';
import IceCream2 from 'lucide-solid/icons/ice-cream-2';
import Sandwich from 'lucide-solid/icons/sandwich';
import Wine from 'lucide-solid/icons/wine';
import Dessert from 'lucide-solid/icons/dessert';
import "./icon.css";

function App() {
  return (
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
  );
}

export default App;
```
:::

### Absolute stroke width

For global absolute stroke width styling the `vector-effect: non-scaling-stroke` CSS property can be applied to the children. This will keep the stroke-width the same size no matter the size of the icon. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more info.

::: sandpack {template=vite-solid editorHeight=300 editorWidthPercentage=60 dependencies="lucide-solid"}

```css icon.css [active]
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

```tsx App.tsx
import TentTree from 'lucide-solid/icons/tent-tree';
import Caravan from 'lucide-solid/icons/caravan';
import FlameKindling from 'lucide-solid/icons/flame-kindling';
import MountainSnow from 'lucide-solid/icons/mountain-snow';
import Trees from 'lucide-solid/icons/trees';
import Axe from 'lucide-solid/icons/axe';
import Map from 'lucide-solid/icons/map';
import CloudMoon from 'lucide-solid/icons/cloud-moon';
import Sparkles from 'lucide-solid/icons/sparkles';
import "./icon.css";

function App() {
  return (
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
  );
}

export default App;
```

:::
