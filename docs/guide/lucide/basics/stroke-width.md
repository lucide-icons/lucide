---
title: Stroke width - Lucide
description: Learn how to customize the stroke width of Lucide icons in your Vanilla JavaScript applications using the strokeWidth and nonScalingStroke attributes.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

::: sandpack {template=vanilla showTabs=false editorHeight=250 editorWidthPercentage=70 dependencies="lucide"}

```html /index.html [active]
<!doctype html>
<html>
  <body>
    <i
      data-lucide="folder-lock"
      stroke-width="1"
    ></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import './styles.css';

import { createIcons, FolderLock } from 'lucide/dist/cjs/lucide';

createIcons({
  icons: {
    FolderLock,
  },
});
```

:::

<!-- ## Non-scaling strokes

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `nonScalingStroke` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `nonScalingStroke` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

[Non-scaling stroke comparison](../../../images/non-scaling-stroke-compare.svg)

### Adjusting stroke width with `nonScalingStroke` prop

Setting `nonScalingStroke` to `true` will make the stroke width non-scaling.

::: sandpack {template=vanilla showTabs=false editorHeight=250 editorWidthPercentage=70 dependencies="lucide"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <i data-lucide="roller-coaster" stroke-width="96" non-scaling-stroke="true"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";

import { createIcons, RollerCoaster } from 'lucide/dist/cjs/lucide';

createIcons({
  icons: {
    RollerCoaster,
  }
});

```

::: -->
