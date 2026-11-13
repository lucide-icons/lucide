---
description: Learn how to use SVG sprites with Lucide icons in your project, including basic usage and inline options.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>
# Using the SVG sprite

Learn how to use SVG sprites with Lucide icons in your project, including basic usage and inline options.

:::warning Not recommended for high traffic production use
The SVG sprite includes all icons, which can significantly increase your app's bundle size and load time. For production environments, we recommend using a bundler with tree-shaking support to include only the icons you actually use. Consider using one of the framework-specific [packages](../../packages.md).
:::

The sprite is used inline: you put it in your page and reference icons with the `<use>` element.
You may also need an additional SVG loader to handle node_modules imports in your project. Check out our [codesandbox example](https://codesandbox.io/s/using-the-svg-sprite-lz1kk) for a working example.

## Using icons in `<img>` tags

The sprite holds each icon as a `<symbol>`. A symbol only renders when a `<use>` element points to it. So a URL fragment like `sprite.svg#house` in an `<img>` tag or a CSS `background-image` shows nothing.

To show an icon in an `<img>` tag, use its own SVG file from `lucide-static/icons/`. See [Link as image](./link-as-image.md) for details:

```html
<img src="lucide-static/icons/house.svg" />
```

To use the sprite, add it inline and reference icons with `<use>`, as shown below.

## Inline usage

You can also use the sprite inline with the `<use>` element. This allows you to apply CSS styles directly to the SVG elements.

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
