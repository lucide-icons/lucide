---
title: Filled Icons - Angular
description: Fills are not officially supported, but can still be applied using standard SVG attributes. This may in some cases produce acceptable results.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Filled Icons

Fills are not officially supported by Lucide.

However, since the icons are standard SVG elements, SVG attributes such as `fill` can still be applied. Depending on the icon, this may produce acceptable results.

## Example with stars:

::: sandpack {template=angular editorHeight=580 editorWidthPercentage=60 dependencies="@lucide/angular"}

```css /src/app/icon.css
.star-rating {
  position: relative;
}

.stars {
  display: flex;
  gap: 4px;
}

.rating {
  position: absolute;
  top: 0;
}
```

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideStar, LucideStarHalf } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideStar, LucideStarHalf],
  template: `
<div class="star-rating">
  <div class="stars">
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
  </div>
  <div class="stars rating">
    <svg lucideStar fill="yellow" strokeWidth="0" />
    <svg lucideStar fill="yellow" strokeWidth="0" />
    <svg lucideStarHalf fill="yellow" strokeWidth="0" />
  </div>
</div>
`,
  styleUrls: ['./app.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```

:::
