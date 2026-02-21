---
title: Stroke width - Angular
description: Learn how to adjust the stroke width of icons in your Angular application using the `strokeWidth` prop or adjust the strokeWidth appearance using the `absoluteStrokeWidth` prop.
---
# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

```angular-ts
import { Component } from '@angular/core';
import { LucideFolderLock } from '@lucide/angular';

@Component({
  selector: "locked-folder",
  imports: [ LucideFolderLock ],
  template: `
    <svg lucideFolderLock strokeWidth="1"></svg>
  `,
})

export class LockedFolderComponent { }
```

## Absolute stroke width

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `absoluteStrokeWidth` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `absoluteStrokeWidth` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

![Absolute stroke width comparison](../../../images/absolute-stroke-width-compare.png?raw=true "Absolute stroke width comparison")

### Adjusting stroke width with `absoluteStrokeWidth` prop

Setting `absoluteStrokeWidth` to `true` will make the stroke width absolute.

```angular-ts
import { Component } from '@angular/core';
import { LucideRollerCoaster } from '@lucide/angular';

@Component({
  selector: "roller-coaster",
  imports: [ LucideRollerCoaster ],
  template: `
    <svg
      lucideRollerCoaster
      size="96"
      absoluteStrokeWidth
    ></svg>
  `,
})

export class RollerCoasterComponent { }
```
