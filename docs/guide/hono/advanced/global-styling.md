---
title: Global Styling - Hono
description: Learn how to style all Lucide icons globally in your Hono application using CSS or the Lucide context provider.
---

# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

For global styling using a context provider, you can use the `LucideProvider` component that is provided by the `@lucide/hono` package.

```tsx
import { Hono } from 'hono';
import { LucideProvider, House } from '@lucide/hono';

const app = new Hono();

app.get('/', (c) => {
  return c.html(
    <LucideProvider
      color="red"
      size={48}
      strokeWidth={2}
    >
      <House />
    </LucideProvider>,
  );
});
```

This will apply the `color`, `size` and `strokeWidth` props to all icons that are children of the `LucideProvider`.

## Style by using CSS

Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

```css
.lucide {
  color: #ffadff;
  width: 56px;
  height: 56px;
  stroke-width: 1px;
}
```

### Non-scaling strokes

For global non-scaling stroke width styling the `vector-effect: non-scaling-stroke` CSS property can be applied to the children. This will keep the stroke-width the same size no matter the size of the icon. See [non-scaling strokes](../basics/stroke-width.md#non-scaling-strokes) for more info.

```css
.lucide {
  width: 48px;
  height: 48px;
  stroke-width: 1.5;
}

.lucide * {
  vector-effect: non-scaling-stroke;
}
```
