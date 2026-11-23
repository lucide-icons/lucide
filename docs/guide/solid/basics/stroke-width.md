---
title: Stroke width - Solid
description: Learn how to adjust the stroke width of icons in your Solid application using the `strokeWidth` prop or adjust the strokeWidth appearance using the `nonScalingStroke` prop.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

::: sandpack {template=vite-solid showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import FolderLock from 'lucide-solid/icons/folder-lock';

function App() {
  return (
    <div class="app">
      <FolderLock strokeWidth={1} />
    </div>
  );
}

export default App;
```

:::

## Non-scaling strokes

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `nonScalingStroke` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `nonScalingStroke` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

<!--@include: ../../../images/non-scaling-stroke-compare.svg -->

### Adjusting stroke width with `nonScalingStroke` prop

Setting `nonScalingStroke` to `true` will make the stroke width non-scaling.

::: sandpack {template=vite-solid showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import RollerCoaster from 'lucide-solid/icons/roller-coaster';

function App() {
  return (
    <div class="app">
      <RollerCoaster
        size={96}
        nonScalingStroke
      />
    </div>
  );
}

export default App;
```

:::
