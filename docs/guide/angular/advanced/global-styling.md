---
title: Global Styling - Angular
description: Learn how to style all icons globally in your Angular application using CSS or the Lucide context provider.
---

# Global Styling

Lucide icons can be customized using the inputs for [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).

To style all icons globally, you can either use CSS or configure global defaults using `provideLucideConfig`.

We recommend using CSS for global styling, as it is the most straightforward approach. However, CSS rules may override the `size`, `color`, and `strokeWidth` inputs on individual icons. If you need to keep those inputs configurable per icon, use `provideLucideConfig` instead.

## Configuring global defaults

Lucide Angular provides the `provideLucideConfig` provider to set default properties for all icons.

You can define global defaults (such as `size`, `color`, or `strokeWidth`) while still allowing individual icons to override them through inputs.

Register the provider in your application configuration or in a top-level component:

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

Styling icons globally can be done using CSS.

All Lucide icons include the `lucide` class. You can use this class in your styles to target every icon in your application.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height).
- The **stroke width** of the icons can be changed using [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width).

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

To keep the stroke width constant regardless of icon size, apply `vector-effect: non-scaling-stroke` to the icon's children. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more details.

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
