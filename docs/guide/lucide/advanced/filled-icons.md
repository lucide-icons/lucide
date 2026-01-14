---
head:
  - - link
    - rel: canonical
      href: https://lucide.dev/guide/vue/advanced/filled-icons
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

::: sandpack {template=vanilla editorHeight=480 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <div class="app">
      <div class="star-rating">
        <div class="stars">
          <i data-lucide="star" fill="#111" stroke-width="0"></i>
          <i data-lucide="star" fill="#111" stroke-width="0"></i>
          <i data-lucide="star" fill="#111" stroke-width="0"></i>
          <i data-lucide="star" fill="#111" stroke-width="0"></i>
          <i data-lucide="star" fill="#111" stroke-width="0"></i>
        </div>
        <div class="stars rating">
          <i data-lucide="star" fill="yellow" stroke-width="0"></i>
          <i data-lucide="star" fill="yellow" stroke-width="0"></i>
          <i data-lucide="star-half" fill="yellow" stroke-width="0"></i>
        </div>
      </div>
    </div>

    <script src="index.js">
    </script>
  </body>
</html>
```

```js /index.js
import { createIcons, Star, StarHalf } from 'lucide/dist/cjs/lucide';
import "./styles.css";
import "./icon.css";

createIcons({
  icons: {
    Star,
    StarHalf,
  }
});
```

```css icon.css
.star-rating {
  position: relative;
}

.stars {
  display: flex;
  gap: 4px;
}

.rating {
  position: absolute;
  top: 0;
}

```
:::
