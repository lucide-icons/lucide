---
title: Sizing - Angular
description: Learn how to adjust the size of icons in your Angular application using the `size` input or by using CSS.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable either by binding the `size` input and CSS.

## Adjusting the icon size using the `size` input

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideLandmark } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideLandmark],
  template: `<svg lucideLandmark [size]="64" />`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```
:::

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: sandpack {template=angular editorHeight=300 dependencies="@lucide/angular"}

```css /src/app/icon.css [active]
.my-beer-icon {
  /* Change this! */
  width: 64px;
  height: 64px;
}
```

```ts /src/app/app.component.ts
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideBeer } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideBeer],
  template: `<svg lucideBeer class="my-beer-icon"></svg>`,
  styleUrls: ['./app.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```

:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: sandpack {template=angular editorHeight=300 dependencies="@lucide/angular"}

```css /src/app/icon.css [active]
.my-icon {
  /* Icon size will relative to font-size of .text-wrapper */
  width: 1em;
  height: 1em;
}

.text-wrapper {
  /* Change this! */
  font-size: 96px;

  /* layout stuff */
  display: flex;
  gap: 0.25em;
  align-items: center;
}
```

```ts /src/app/app.component.ts
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideStar } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideStar],
  template: `<div class="text-wrapper">
  <svg lucideStar class="my-icon"></svg>
  <div>Yes</div>
</div>`,
  styleUrls: ['./app.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```

:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

```html [app.html]
<div>
  <svg lucidePartyPopper class="size-24"></svg>
</div>
```
