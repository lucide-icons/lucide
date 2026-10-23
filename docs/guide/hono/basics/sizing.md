---
title: Sizing - Hono
description: Learn how to adjust the size of Lucide icons in your Hono applications using the size prop and CSS.
---

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

```tsx
import { Landmark } from '@lucide/hono';

const Page = () => {
  return <Landmark size={64} />;
};
```

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

```tsx
import { Beer } from '@lucide/hono';
import { css, Style } from 'hono/css';

const beerIcon = css`
  width: 64px;
  height: 64px;
`;

const Page = () => {
  return (
    <>
      <Style />
      <Beer class={beerIcon} />
    </>
  );
};
```

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

```tsx [page.tsx]
import { Star } from '@lucide/hono';

const Page = () => {
  return (
    <div class="text-wrapper">
      <Star class="my-icon" />
      <div>Yes</div>
    </div>
  );
};
```

:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

```tsx
import { PartyPopper } from '@lucide/hono';

const Page = () => {
  return <PartyPopper class="size-24" />;
};
```
