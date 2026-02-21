---
title: Global Styling - Angular
description: Learn how to style all icons globally in your Angular application using CSS or the Lucide context provider.
---

# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

Lucide Angular provides a context API called `provideLucideConfig` that allows you to set global default properties for all Lucide icons in your application.
This is useful if you want all icons to share the same size, color, or stroke width by default.

### Setting global defaults

You can call `provideLucideConfig` in your main entry file or in a top-level component to set the default properties for all icons.

```ts
import { ApplicationConfig } from '@angular/core';
import { provideLucideConfig } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideConfig({
      strokeWidth: 1.5
    }),
  ]
};
```

## Style by using CSS

Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

::: code-group

```css [app.css]
.lucide {
  color: #ffadff;
  width: 56px;
  height: 56px;
  stroke-width: 1px;
}
```

```html app.html
<div>
  <svg lucideCakeSlice />
  <svg lucideCandy />
  <svg lucideApple />
  <svg lucideCookie />
</div>
```
:::

### Absolute stroke width

For global absolute stroke width styling the `vector-effect: non-scaling-stroke` CSS property can be applied to the children. This will keep the stroke-width the same size no matter the size of the icon. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more info.

::: code-group

```css [app.css]
.lucide {
  color: #ffadff;
  width: 56px;
  height: 56px;
  stroke-width: 1px;
}

.lucide * {
  vector-effect: non-scaling-stroke;
}
```

```html app.html
<div>
  <svg lucideTentTree />
  <svg lucideCaravan />
  <svg lucideFlameKindling />
  <svg lucideMountainSnow />
</div>
```
:::
