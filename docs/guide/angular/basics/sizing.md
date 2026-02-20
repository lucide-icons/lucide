# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

```angular-ts
import { Component } from '@angular/core';
import { LucideLandmark } from '@lucide/angular';

@Component({
  selector: "landmark",
  imports: [ LucideLandmark ],
  template: `
    <svg lucideLandmark size="64"></svg>
  `,
})

export class LandmarkComponent { }
```

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: code-group

```css [app.css]
.my-beer-icon {
  width: 64px;
  height: 64px;
}
```

```angular-html [app.html]
<svg lucideBeer class="my-beer-icon"></svg>
```

```angular-ts [app.ts]
import { Component } from '@angular/core';
import { LucideBeer } from '@lucide/angular';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrl: './app.css'
  imports: [LucideBeer],
})

export class App { }
```
:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: code-group

```css [app.css]
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

```angular-html [app.html]
<div className="text-wrapper">
  <svg lucideStar class="my-icon"></svg>
  <div>Yes</div>
</div>
```

```angular-ts [app.ts]
import { Component } from '@angular/core';
import { LucideStar } from '@lucide/angular';

@Component({
  selector: 'app',
  templateUrl: './app.html',
  styleUrl: './app.css'
  imports: [LucideStar],
})

export class App { }
```
:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

```html [app.html]
<div>
  <svg lucidePartyPopper class="size-24"></svg>
</div>
```
