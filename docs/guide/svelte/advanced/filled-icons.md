<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackSvelte.vue';
</script>

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

::: sandpack {template=vite-svelte showTabs=false editorHeight=480 editorWidthPercentage=60}

```svelte src/App.svelte [active]
<script>
import Star from '@lucide/svelte/icons/star';
import StarHalf from '@lucide/svelte/icons/star-half';
import "./icon.css";

const items = Array.from({ length: 5 })
</script>

<div class="app">
  <div class="star-rating">
    <div class="stars">
      {#each items as item}
        <Star
          fill="#111"
          strokeWidth="0"
        />
      {/each}
    </div>
    <div class="stars rating">
      <Star fill="yellow" strokeWidth="0" />
      <Star fill="yellow" strokeWidth="0" />
      <StarHalf fill="yellow" strokeWidth="0" />
    </div>
  </div>
</div>
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
