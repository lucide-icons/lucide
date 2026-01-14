<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `width` and `height` attributes and or by CSS.

## Adjusting the icon size using the `width` and `height` attribute

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <i data-lucide="landmark" width="64" height="64"></i>

    <script src="index.js">
    </script>
  </body>
</html>
```

```js /index.js
import "./styles.css";

import { createIcons, Landmark } from 'lucide/dist/cjs/lucide';

createIcons({
  icons: {
    Landmark,
  }
});
```

:::

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: sandpack {template=vanilla editorHeight=300 editorWidthPercentage=60 dependencies="lucide"}

```css icon.css [active]
.my-beer-icon {
  /* Change this! */
  width: 64px;
  height: 64px;
}
```

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <i data-lucide="beer" class="my-beer-icon"></i>

    <script src="index.js">
    </script>
  </body>
</html>
```

```js /index.js
import { createIcons, Beer } from 'lucide/dist/cjs/lucide';
import "./styles.css";
import "./icon.css";

createIcons({
  icons: {
    Beer,
  }
});
```
:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: sandpack {template=vanilla editorHeight=320  dependencies="lucide"}

```css icon.css [active]
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

```js /index.js
import { createIcons, Star } from 'lucide/dist/cjs/lucide';
import "./styles.css";
import "./icon.css";

createIcons({
  icons: {
    Star,
  }
});
```

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <div class="text-wrapper">
      <i data-lucide="star" class="my-icon"></i>
      <div>Yes</div>
    </div>

    <script src="index.js">
    </script>
  </body>
</html>
```

:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

::: sandpack {template=vanilla editorHeight=300 editorWidthPercentage=60 dependencies="lucide" externalResources="https://cdn.tailwindcss.com"}

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <i data-lucide="party-popper" class="size-24"></i>

    <script src="index.js">
    </script>
  </body>
</html>
```

```js /index.js [hidden]
import { createIcons, PartyPopper } from 'lucide/dist/cjs/lucide';
import "./styles.css";

createIcons({
  icons: {
    PartyPopper,
  }
});
```

:::
