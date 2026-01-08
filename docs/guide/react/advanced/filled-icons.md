---
head:
  - - link
    - rel: canonical
      href: https://lucide.dev/guide/vue/advanced/filled-icons
---

<script setup>
import { Sandpack } from 'sandpack-vue3'
</script>

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

::: sandpack {template=react editorHeight=580 editorWidthPercentage=60 dependencies="lucide-react"}

```jsx App.js [active]
import { Star, StarHalf } from "lucide-react";
import "./icon.css";

function App() {
  return (
    <div className="app">
      <div className="star-rating">
        <div className="stars">
          { Array.from({ length: 5 }, () => (
              <Star fill="#111" strokeWidth={0} />
          ))}
        </div>
        <div className="stars rating">
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
