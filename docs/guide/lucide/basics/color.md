<script setup>
import { Sandpack } from 'sandpack-vue3'
// import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
// import buttonExampleFiles from './examples/button-example/files.ts'
// import iconColorExampleFiles from './examples/color-icon/files.ts'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [`currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` attribute

The color can be adjusted by passing the color attribute to the element.

::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html [active]
<!DOCTYPE html>
<html>

<head>
  <title>My appp</title>
  <meta charset="UTF-8" />
</head>

<body>
  <i data-lucide="menu" color="#ff0000"></i>

  <script src="index.js">
  </script>
</body>

</html>
```

```js /index.js
import "./styles.css";

import { createIcons, Menu } from 'lucide';

createIcons({
  icons: {
    Menu,
  }
});

```

:::


## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

<!-- ::: sandpack {template=vanilla showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html [active]
<!DOCTYPE html>
<html>

<head>
  <title>My app</title>
  <meta charset="UTF-8" />
</head>

<body style="color: #3e9392;">
  <i data-lucide="menu"></i>

  <script src="index.js">
  </script>
</body>

</html>
```

```js /index.js
import "./styles.css";

import { createIcons, Menu } from 'lucide';

createIcons({
  icons: {
    Menu,
  }
});

```

::: -->
