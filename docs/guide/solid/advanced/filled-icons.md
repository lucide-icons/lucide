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

::: sandpack {template=vite-solid editorHeight=580 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import Star from 'lucide-solid/icons/star';
import StarHalf from 'lucide-solid/icons/star-half';

import "./icon.css";

function App() {
  return (
    <div class="app">
      <div class="star-rating">
        <div class="stars">
          { Array.from({ length: 5 }, () => (
              <Star fill="#111" strokeWidth={0} />
          ))}
        </div>
        <div class="stars rating">
          <Star fill="yellow" strokeWidth={0} />
          <Star fill="yellow" strokeWidth={0} />
          <StarHalf fill="yellow" strokeWidth={0} />
        </div>
      </div>
    </div>
  );
}

export default App;
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
