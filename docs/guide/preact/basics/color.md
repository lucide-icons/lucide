---
title: Color - Preact
description: Learn how to adjust the color of icons in your Preact application using the `color` prop or by using parent elements text color value.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackPreact.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

::: sandpack {showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide-preact"}

```js App.js [active]
import { h } from "preact";
import { Smile } from "lucide-preact";

function App() {
  return (
    <div className="app">
      <Smile color="#3e9392" />
    </div>
  );
}

export default App;
```

:::

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

::: sandpack {showTabs=false editorHeight=340 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx Button.jsx [active]
import { h } from "preact";
import { ThumbsUp } from "lucide-preact";

function LikeButton() {
  return (
    <button style={{ color: "#fff" }}>
      <ThumbsUp />
      Like
    </button>
  );
}

export default LikeButton;
```

```js App.js [hidden]
import { h } from "preact";
import Button from "./Button";

export default function App() {
  return <Button />;
}

```

:::
