<script setup>
// import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
import buttonExampleFiles from './examples/button-example/files.ts'
import iconColorExampleFiles from './examples/color-icon/files.ts'

import Sandpack from '../../../.vitepress/theme/components/editors/SandpackSvelte.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

<!-- This one is faked, since codesandbox doesn't support svelte 5 yet -->
<!-- <Sandpack
  template="vue"
  :theme="sandpackTheme"
  :customSetup='{
    dependencies: {
      "@lucide/svelte": "latest",
      "lucide-vue-next": "latest"
    }
  }'
  :files="iconColorExampleFiles"
  :options="{
    editorHeight: 295,
    editorWidthPercentage: 60,
    showOpenInCodeSandbox: false,
  }"
/> -->

::: sandpack {template=vite-svelte showTabs=false editorHeight=240 editorWidthPercentage=60}

```svelte src/App.svelte [active]
<script>
import Smile from '@lucide/svelte/icons/smile';
</script>

<Smile color="#3e9392" />
:::


## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

::: sandpack {template=vite-svelte showTabs=false editorHeight=240 editorWidthPercentage=60}

```svelte src/App.svelte [active]
<script>
import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
</script>

<button style:color="#fff">
  <ThumbsUp />
  Like
</button>

:::
