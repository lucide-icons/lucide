---
title: Color - Vue
description: Learn how to adjust the color of icons in your Vue application using the `color` prop or by using parent elements text color value.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

::: sandpack {template=vue showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { Smile } from "lucide-vue-next";
</script>

<template>
  <Smile color="#3e9392" />
</template>
```

:::

## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

::: sandpack {template=vue showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { ThumbsUp } from "lucide-vue-next";
</script>

<template>
  <button :style="{ color: '#fff' }">
    <ThumbsUp />
    Like
  </button>
</template>

```
:::
