<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Use Lucide in Web

:::warning Not recommended for high traffic production use
This library exports each svg as basic strings. We have a more optimized library for web. Which is smaller in size and supports color, size and strokeWidth. See [Lucide](../../lucide/index.md).
:::

You can also import SVG strings in your web projects, with the lucide-static package. Each icon is exported as a string containing the SVG markup, which can be used in client-side rendering.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide-static"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";
import { Smile } from 'lucide-static';

document.getElementById("app").innerHTML = Smile;
```
:::

> Note: Each icon name is in PascalCase. You can find the icon names in the [Lucide Icons page](https://lucide.dev/icons).
