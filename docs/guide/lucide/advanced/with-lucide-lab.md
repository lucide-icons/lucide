<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by adding the `@lucide/lab` package to your project.
All props like regular lucide icons can be passed to adjust the icon appearance.

## Using Lucide lab icons

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

::: sandpack {template=vanilla editorHeight=295 editorWidthPercentage=60 dependencies="lucide,@lucide/lab"}

```html /index.html [active]
<!DOCTYPE html>
<html>
  <body>
    <i data-lucide="avocado"></i>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js
import "./styles.css";

import { createIcons, Smile } from 'lucide/dist/cjs/lucide';
import { avocado as Avocado } from '@lucide/lab';

createIcons({
  icons: {
    Avocado,
  }
});

```

:::
