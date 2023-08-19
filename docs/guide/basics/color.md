<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../.vitepress/theme/sandpackTheme.json'
import buttonExampleFiles from './examples/button-example/files.ts'
</script>

# Color

By default all icons have the color value: `currentColor`. This keyword uses the elements computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the color of the parent.

So for example if a parent element color value is `#3e9392` and one of the children is a lucide icon, the color of the icon will be rendered  as `#3e9392`. This is browser native behaviour.

**Example using a Button component with React**

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="buttonExampleFiles"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 400,
  }"
/>

## Adjust the color using props

By passing props the color can adjusted by using the color prop on the element.

<!-- Example codesandbox -->
[Code Example codesandbox]
