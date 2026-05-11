---
title: Combining icons - Angular
description: Learn how to combine multiple icons into a single icon nested SVG elements in your Angular application.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Combining icons

You can combine multiple icons into a single icon by using SVG in SVG.
This is useful for if you want to be creative and make your own custom icons by combining existing icons.

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideScan, LucideUser } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideScan, LucideUser],
  template: `
      <svg lucideScan [size]="48">
        <svg lucideUser
          [size]="12"
          x="6"
          y="6"
          [strokeWidth]="4"
          [absoluteStrokeWidth]="true"
        />
      </svg>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```
:::

This is valid SVG and all SVG properties are supported on the icons.
The `x` and `y` coordinates can be adjusted to position the icons as you like.

::: info Limitation
When combining icons, you need to make sure that the `x` and `y` coordinates are within the `viewBox` of the outer icon (24x24).
:::

## With custom SVG elements

You can also use SVG elements to create your own icons.

### Example with notification badge

For example, you can add a notification badge to an icon by using the `circle` SVG element.


::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation, signal } from "@angular/core";
import { LucideMail } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideMail],
  template: `
      <svg lucideMail [size]="48">
        @if (hasUnreadMessages()) {
          <circle
            r="3"
            cx="21"
            cy="5"
            stroke="none"
            fill="#F56565"
          />
        }
      </svg>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly hasUnreadMessages = signal<boolean>(true);
}
```
:::

### Example with text element

You can also use the `text` SVG element to add text to your icon.


::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideFile } from "@lucide/angular";

@Component({
  selector: 'app',
  imports: [LucideFile],
  template: `
      <svg lucideFile [size]="48">
        <text
          x="7.5"
          y="19"
          font-size="8"
          font-family="Verdana,sans-serif"
          stroke-width="1"
        >
          JS
        </text>
      </svg>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```
:::
