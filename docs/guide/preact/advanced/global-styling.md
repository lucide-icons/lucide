<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
import globalIconCssExample from './examples/global-styling-css-example/files.ts'
import globalAbsoluteStrokewidthExample from './examples/global-styling-absolute-strokewidth-example/files.ts'

</script>

# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

For global styling using a context provider, you can use the `LucideProvider` component that is provided by the `lucide-preact` package.

```tsx
import { LucideProvider, Home } from 'lucide-preact';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

This will apply the `color`, `size` and `strokeWidth` props to all icons that are children of the `LucideProvider`.


## Style by using CSS
Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

<Sandpack
  template="vanilla"
  :theme="sandpackTheme"
  :files="globalIconCssExample"
  :options="{
    eeditorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>

### Absolute stroke width

For global absolute stroke width styling the `vector-effect: non-scaling-stroke` CSS property can be applied to the children. This will keep the stroke-width the same size no matter the size of the icon. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more info.

<Sandpack
  template="vanilla"
  :theme="sandpackTheme"
  :files="globalAbsoluteStrokewidthExample"
  :options="{
    editorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>

