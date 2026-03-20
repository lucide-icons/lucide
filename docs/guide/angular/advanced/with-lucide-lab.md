---
title: Lucide Lab - Angular
description: Learn how to use icons from Lucide Lab in your Angular application.
---

# With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

While they aren't provided as standalone components, they can be still be passed to the `LucideIcon` component the same way as official icons:

```html
<!-- Directly as LucideIconData: -->
<svg [lucideIcon]="CoconutIcon"></svg>

<!-- As a provided icon by name: -->
<svg lucideIcon="coconut"></svg>
```

```ts{2,6-7,11-12}
import { Component } from '@angular/core';
import { LucideIcon, lucideLegacyIcon, provideLucideIcons } from '@lucide/angular';
import { coconut } from '@lucide/lab';

@Component({
  templateUrl: './foobar.html',
  // For using by name via provider:
  providers: [provideLucideIcons(lucideLegacyIcon('coconut', coconut))],
  imports: [LucideIcon]
})
export class Foobar {
  // For passing directly as LucideIconData:
  readonly CoconutIcon = lucideLegacyIcon('coconut', coconut);
}
```

### Creating custom icon components

You can also create your own standalone icon components using `LucideIconBase`.

Be sure to use an SVG element selector, e.g. `svg[lucide{IconName}]`

```ts [icons/coconut.ts]
import {
  LucideIconBase,
  lucideIconTemplate,
  lucideLegacyIcon
} from '@lucide/angular';
import { coconut } from '@lucide/lab';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'svg[lucideCoconut]',
  template: lucideIconTemplate,
  standalone: true,
})
export class LucideCoconut extends LucideIconBase {
  static readonly icon = lucideLegacyIcon('coconut', coconut);
  protected override readonly icon = signal(LucideCoconut.icon);
}
```

```ts [app.ts]
import { Component } from "@angular/core";
import { LucideCoconut } from "./icons/coconut";

@Component({
  selector: 'app',
  imports: [LucideCoconut],
  template: `<svg lucideCoconut></svg>`,
})
export class App {
}
```
