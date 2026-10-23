---
title: Stroke width - Angular
description: Learn how to adjust the stroke width of icons in your Angular application using the `strokeWidth` input or adjust the strokeWidth appearance using the `nonScalingStroke` input.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with the `strokeWidth` input

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from '@angular/core';
import { LucideFolderLock } from '@lucide/angular';

@Component({
  selector: 'app',
  imports: [LucideFolderLock],
  template: `<svg
    lucideFolderLock
    [strokeWidth]="1"
  />`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::

## Non-scaling strokes

When binding the `size` input, the icon's stroke width will be relative to its size, this is the default SVG behavior. The `nonScalingStroke` input is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `nonScalingStroke` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

<!--@include: ../../../images/non-scaling-stroke-compare.svg -->

### Adjusting stroke width with `nonScalingStroke` input

Setting `nonScalingStroke` to `true` will make the stroke width non-scaling.

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from '@angular/core';
import { LucideRollerCoaster } from '@lucide/angular';

@Component({
  selector: 'app',
  imports: [LucideRollerCoaster],
  template: `
    <svg
      lucideRollerCoaster
      [size]="96"
      [nonScalingStroke]="true"
    ></svg>
  `,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {}
```

:::
