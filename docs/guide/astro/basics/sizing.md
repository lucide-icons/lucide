---
title: Sizing - Astro
description: Learn how to adjust the size of Lucide icons in your Astro applications using the size prop and CSS.
---

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

```astro
---
import Landmark from '@lucide/astro/icons/landmark';
---

<Landmark size={64} />
```

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: code-group

```css [icon.css]
.my-beer-icon {
  width: 64px;
  height: 64px;
}
```

```astro [page.astro]
---
import Beer from '@lucide/astro/icons/beer';
import './icon.css'
---

<Beer class="my-beer-icon" />
```
:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: code-group

```css [icon.css]
.my-icon {
  /* Icon size will relative to font-size of .text-wrapper */
  width: 1em;
  height: 1em;
}

.text-wrapper {
  font-size: 96px;

  /* layout stuff */
  display: flex;
  gap: 0.25em;
  align-items: center;
}
```

```astro [page.astro]
---
import Star from '@lucide/astro/icons/star';
import './icon.css'
---

<div class="text-wrapper">
  <Star class="my-icon" />
  <div>Yes</div>
</div>
```
:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

```astro
---
import PartyPopper from '@lucide/astro/icons/party-popper';
---

<PartyPopper class="size-24" />
```
