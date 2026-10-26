---
title: Sizing - Preact
description: Learn how to adjust the size of icons in your Preact application using the `size` prop or by using CSS.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackPreact.vue'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

::: sandpack {showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="lucide-preact"}

```js App.js [active]
import { h } from "preact";
import { Landmark } from "lucide-preact";

function App() {
  return (
    <div className="app">
      <Landmark size={64} />
    </div>
  );
}

export default App;
```

:::

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: sandpack {editorHeight=320 dependencies="lucide-preact"}

```css icon.css [active]
.my-beer-icon {
  /* Change this! */
  width: 64px;
  height: 64px;
}
```

```jsx App.js
import { h } from "preact";
import { Beer } from "lucide-preact";
import "./icon.css";

function App() {
  return (
    <div className="app">
      <Beer className="my-beer-icon" />
    </div>
  );
}

export default App;
```
:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: sandpack {editorHeight=320 dependencies="lucide-preact"}

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

```jsx App.js
import { h } from "preact";
import { Star } from "lucide-preact";
import "./icon.css";

function App() {
  return (
    <div className="text-wrapper">
      <Star class="my-icon" />
      <div>Yes</div>
    </div>
  );
}

export default App;
```

:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

::: sandpack {showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="lucide-preact" externalResources="https://cdn.tailwindcss.com"}

```js App.js [active]
import { h } from "preact";
import { PartyPopper } from "lucide-preact";

function App() {
  return (
    <div>
      <PartyPopper className="size-24" />
    </div>
  );
}

export default App;
```

:::

