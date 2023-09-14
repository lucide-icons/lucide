<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../.vitepress/theme/sandpackTheme.json'
import buttonExampleFiles from './examples/button-example/files.ts'
import iconColorExampleFiles from './examples/color-icon/files.ts'
</script>

# Color

By default all icons have the color value: `currentColor`. This keyword uses the elements computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)

## Adjust the color using the `color` prop

By passing props the color can adjusted by using the color prop on the element.

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="iconColorExampleFiles"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 295,
  }"
/>

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element or it inherits it from it's parent.

So for example if a parent element color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behaviour.

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
    editorHeight: 320,
  }"
/>
