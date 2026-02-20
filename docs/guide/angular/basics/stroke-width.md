# Stroke width

All icons are designed with SVG elements using strokes.
These have a default stroke width of `2px`.

The `strokeWidth` can be adjusted to create a different look of the icons.

## Adjusting stroke width with `strokeWidth` prop

::: code-group

```html [app.html]
<svg lucideFolderLock strokeWidth="1"></svg>
```

```ts [app.ts]
import { Component } from '@angular/core';
import { LucideFolderLock } from '@lucide/angular';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrl: './app.css'
  imports: [LucideFolderLock],
})

export class App { }
```
:::

## Absolute stroke width

When adjusting the `size` prop the size of the stroke width will be relative to the size of the icon, this is the default SVG behavior. The `absoluteStrokeWidth` prop is introduced to adjust this behavior to make the stroke width constant no matter the size of the icon.

This means that when `absoluteStrokeWidth` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will still be `2px` on the screen.

Note `2px` is the default stroke width for a Lucide icon, this can be adjusted to all sizes.

![Absolute stroke width comparison](../../../images/absolute-stroke-width-compare.png?raw=true "Absolute stroke width comparison")

### Adjusting stroke width with `absoluteStrokeWidth` prop

Setting `absoluteStrokeWidth` to `true` will make the stroke width absolute.

::: code-group

```html [app.html]
<svg
  lucideRollerCoaster
  size="96"
  absoluteStrokeWidth
/>
```

```ts [app.ts]
import { Component } from '@angular/core';
import { LucideFolderLock } from '@lucide/angular';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrl: './app.css'
  imports: [LucideFolderLock],
})

export class App { }
```
:::
