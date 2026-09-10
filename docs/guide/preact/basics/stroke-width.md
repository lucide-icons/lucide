---
title: Stroke width - Preact
description: Learn how to adjust the stroke width of icons in your Preact application using the `strokeWidth` prop or adjust the strokeWidth appearance using the `nonScalingStroke` prop.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackPreact.vue'
</script>

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

::: sandpack {showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx App.js [active]
import { h } from 'preact';
import { FolderLock } from 'lucide-preact';

function App() {
  return (
    <div className="app">
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

::: sandpack {showTabs=false editorHeight=340 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx App.js [active]
import { h } from 'preact';
import { RollerCoaster } from 'lucide-preact';

function App() {
  return (
    <div className="app">
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
