---
title: Global Styling - Preact
description: Learn how to style all Lucide icons globally in your Preact application using CSS or the Lucide context provider.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackPreact.vue'
</script>

# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

For global styling using a context provider, you can use the `LucideProvider` component that is provided by the `lucide-preact` package.

```tsx
import { LucideProvider, Home } from 'lucide-preact';

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

::: sandpack {editorHeight=400 editorWidthPercentage=60 dependencies="lucide-preact"}

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

```jsx App.js
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
} from "lucide-preact";
import { h } from "preact";
import "./icon.css";

function App() {
  return (
    <div className="grid">
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

::: sandpack {editorHeight=480 editorWidthPercentage=60 dependencies="lucide-preact"}

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

```jsx App.js
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
} from "lucide-preact";
import { h } from "preact";
import "./icon.css";

function App() {
  return (
    <div className="grid">
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
