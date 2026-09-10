---
description: Using the web font version of Lucide icons in your project. Learn how to include the stylesheet and use the icons with CSS classes.
nextPage:
  - getting-started
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>
# Icon Font

Lucide icons are also available as a web font. The font includes all icons as glyphs, allowing you to use them in your project with CSS classes. This can be a convenient option for projects that prefer using icon fonts.

:::warning Not recommended for high traffic production use
The Icon font includes all icons, which can significantly increase your app's bundle size and load time. For production environments, we recommend using a bundler with tree-shaking support to include only the icons you actually use. Consider using one of the framework-specific [packages](../../../packages.md).
:::

## Using the CSS Stylesheet

::: code-group

```css [Vite]
@import 'lucide-static/font/lucide.css';
```

```css [Webpack]
@import "~lucide-static/font/lucide.css";
```

```html [CDN]
<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css" />
```

```html [Static asset]
<link rel="stylesheet" href="/your/path/to/lucide.css" />
```

:::

## Using the Icon Font

Once you have included the stylesheet, you can use the icons in your HTML by applying the appropriate CSS classes. Each icon has a corresponding class name that you can use to display it.

For example, to display the "home" icon, you would use the following HTML:

```html
<div class="icon-house"></div>
```

## Example with JavaScript

<!-- TODO: Fix this example -->
::: sandpack {template=vanilla showTabs=false editorHeight=480 editorWidthPercentage=60 dependencies="lucide-static"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <i class="icon-home"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";
import "lucide-static/font/lucide.css";
```

:::
