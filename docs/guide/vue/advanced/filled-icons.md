<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

::: sandpack {template=vue editorHeight=580 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { Star, StarHalf } from "lucide-vue-next";
import "./icon.css";
</script>

<template>
  <div class="app">
    <div class="star-rating">
      <div class="stars">
        <Star
          v-for="i in 5"
          fill="#111"
          strokeWidth="0"
        />
      </div>
      <div class="stars rating">
        <Star fill="yellow" strokeWidth="0" />
        <Star fill="yellow" strokeWidth="0" />
        <StarHalf fill="yellow" strokeWidth="0" />
      </div>
    </div>
  </div>
</template>
```

```css src/icon.css
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
