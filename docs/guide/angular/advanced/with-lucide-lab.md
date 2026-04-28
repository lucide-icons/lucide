---
title: Lucide Lab - Angular
description: Learn how to use icons from Lucide Lab in your Angular application.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# With Lucide Lab or custom icons

[Lucide Lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

While they aren't provided as standalone components, they can be still be passed to the `LucideIcon` component the same way as official icons:

### Directly as LucideIconData

::: sandpack {template=angular showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular,@lucide/lab"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation, signal } from "@angular/core";
import { LucideDynamicIcon, lucideLegacyIcon } from '@lucide/angular';
import { coconut } from '@lucide/lab';

@Component({
  selector: 'app',
  template: `
    <svg [lucideIcon]="icon()"></svg>
  `,
  imports: [LucideDynamicIcon],
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
  readonly icon = signal(lucideLegacyIcon('coconut', coconut));
}
```

:::


### As a provided icon by name

::: sandpack {template=angular editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular,@lucide/lab"}

```ts /src/app/app.component.ts [active]
import { Component, ViewEncapsulation } from "@angular/core";
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app',
  template: `
    <svg lucideIcon="bat-ball"></svg>
  `,
  imports: [LucideDynamicIcon],
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```

```ts /src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { lucideLegacyIcon, provideLucideIcons } from '@lucide/angular';
import { batBall } from '@lucide/lab';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideIcons(
      lucideLegacyIcon('bat-ball', batBall)
    )
  ]
};
```

:::

### Creating custom icon components

You can also create your own standalone icon components using `LucideIconBase`.

Be sure to use an SVG element selector, e.g. `svg[lucide{IconName}]`

::: sandpack {template=angular editorHeight=400 editorWidthPercentage=60 dependencies="@lucide/angular,@lucide/lab"}

```ts /src/icons/bottle-champagne.ts
import {
  LucideIconBase,
  lucideIconTemplate,
  lucideLegacyIcon
} from '@lucide/angular';
import { Component, signal } from '@angular/core';
import { bottleChampagne } from '@lucide/lab';

@Component({
  selector: 'svg[lucideBottleChampagne]',
  template: lucideIconTemplate,
  standalone: true,
})
export class LucideBottleChampagne extends LucideIconBase {
  static readonly icon = lucideLegacyIcon('bottle-champagne', bottleChampagne);
  protected override readonly icon = signal(LucideBottleChampagne.icon);
}
```

```ts /src/app/app.component.ts
import { Component, ViewEncapsulation, signal } from "@angular/core";
import { LucideDynamicIcon, lucideLegacyIcon } from '@lucide/angular';
import { LucideBottleChampagne } from "../icons/bottle-champagne";

@Component({
  selector: 'app',
  template: `<svg lucideBottleChampagne></svg>`,
  imports: [LucideBottleChampagne],
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class App {
}
```

:::
