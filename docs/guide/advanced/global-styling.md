<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../.vitepress/theme/sandpackTheme.json'
import globalIconCssExample from './examples/global-styling-css-example/files.ts'
import globalAbsoluteStrokewidthExample from './examples/global-styling-absolute-strokewidth-example/files.ts'

</script>

# Global Styling

Adjusting icons can be done by [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).

By default, all icons have a **color** value of `currentColor`, a **size** value of `24px`, and a **stroke width** of `2`. Styling icons individually can be done by passing props to the icon component.

## Style by using CSS
Styling icons is easy to accomplish using CSS.

Every icon has a class attribute applied called `lucide`. This class name can be used in the CSS file to target all icons that are being used within the app.

- The **color** of the icons can be changed using the [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) CSS property.
- The **size** of the icons can be changed using [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) and [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/height) CSS properties.
- The **stroke width** of the icons can be changed using the [`stroke-width`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) CSS property.

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="globalIconCssExample"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 300,
  }"
/>

### Absolute stroke width

For global absolute stroke width styling the `vector-effect: non-scaling-stroke` CSS property can be applied to the children. This will keep the stroke-width the same size no matter the size of the icon. See [absolute-stroke-width](../basics/stroke-width.md#absolute-stroke-width) for more info.

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="globalAbsoluteStrokewidthExample"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 300,
  }"
/>

