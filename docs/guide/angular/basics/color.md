<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackAngular.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

::: sandpack {template=vite showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/app/app.ts [active]
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<h1>Helloworld!</h1>`,
})
export class App {}

```

:::

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.


