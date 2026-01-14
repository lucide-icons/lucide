<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Shadow DOM

It's possible to use Lucide icons within a shadow DOM.

## Example using `createElement` function

Using the `createElement` function to create a single icon and append it to a shadow DOM.

::: sandpack {template=vanilla editorHeight=300 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <div id="container"></div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js [active]
import "./styles.css";
import { Home, createElement } from 'lucide/dist/cjs/lucide';

const container = document.getElementById('container');
const shadowRoot = container.attachShadow({ mode: 'open' });

const iconElement = createElement(Home)
shadowRoot.appendChild(iconElement);
```

:::


## Example using `createIcons` function

If you want to create multiple icons within a shadow DOM, you can use the `createIcons` function.
With the `root` option, you can specify the shadow root as the root element where the icons should be rendered.

::: sandpack {template=vanilla editorHeight=420 editorWidthPercentage=60 dependencies="lucide"}

```html /index.html
<!DOCTYPE html>
<html>
  <body>
    <div id="container"></div>

    <script src="index.js"></script>
  </body>
</html>
```

```js /index.js [active]
import "./styles.css";
import { TreePalm, Volleyball, Waves, createIcons } from 'lucide/dist/cjs/lucide';

const container = document.getElementById('container');
const shadowRoot = container.attachShadow({ mode: 'open' });

const iconWrapper = document.createElement('div');
iconWrapper.innerHTML = `
<i data-lucide="tree-palm"></i>
<i data-lucide="volleyball"></i>
<i data-lucide="waves"></i>
`;
shadowRoot.appendChild(iconWrapper);

createIcons({
  root: shadowRoot,
  icons: {
    TreePalm,
    Volleyball,
    Waves,
  }
})
```

:::
