---
title: Filled Icons - Preact
description: Learn how to use fills with Lucide icons in your Preact application, and the limitations of using fills with Lucide icons.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackPreact.vue'
</script>

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

::: sandpack { editorHeight=580 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx App.js [active]
import { Star, StarHalf } from "lucide-preact";
import { h } from "preact";
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
