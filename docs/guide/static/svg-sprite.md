---
description: Learn how to use SVG sprites with Lucide icons in your project, including inline usage and a CSS helper class.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>
# Using the SVG sprite

Learn how to use SVG sprites with Lucide icons in your project, including inline usage and a CSS helper class.

The sprite is used inline: you put it in your page and reference icons with the `<use>` element.
You may also need an additional SVG loader to handle node_modules imports in your project. Check out our [codesandbox example](https://codesandbox.io/s/using-the-svg-sprite-lz1kk) for a working example.

## Inline usage

Use the sprite inline with the `<use>` element. This allows you to apply CSS styles directly to the SVG elements.

::: sandpack {template=vanilla showTabs=false editorHeight=480 editorWidthPercentage=60 dependencies="lucide-static"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <use href="#alarm-clock-check" />
    </svg>

    <div id="sprite" style="display: none;"></div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";
import sprite from "lucide-static/sprite.svg";

document.getElementById('sprite').innerHTML = sprite;
```

:::

## Inline with CSS helper class

If you'd prefer, you can use CSS to hold your base SVG properties:

::: sandpack {template=vanilla editorHeight=320 editorWidthPercentage=60 dependencies="lucide-static"}

```css /icon.css [active]
.lucide-icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="lucide-icon"
    >
      <use href="#alarm-clock-check" />
    </svg>

    <div id="sprite" style="display: none;"></div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";
import "./icon.css";
import sprite from "lucide-static/sprite.svg";

document.getElementById('sprite').innerHTML = sprite;
```
:::

