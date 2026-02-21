---
title: Color - Angular
description: Learn how to adjust the color of icons in your Angular application using the `color` prop or by using parent elements text color value.
---

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

```angular-ts
import { Component } from '@angular/core';
import { LucideSmile } from '@lucide/angular';

@Component({
  selector: "smile",
  imports: [ LucideSmile ],
  template: `
    <svg lucideSmile color="#3e9392"></svg>
  `,
})

export class SmileComponent { }
```

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

```angular-ts
import { Component } from '@angular/core';
import { LucideThumbsUp } from '@lucide/angular';

@Component({
  selector: "like-button",
  imports: [ LucideThumbsUp ],
  template: `
    <button style="color:#fff">
      <svg lucideThumbsUp></svg>
      Like
    </button>
  `,
})

export class LikeButtonComponent { }
```
