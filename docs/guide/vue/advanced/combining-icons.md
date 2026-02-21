---
title: Combining icons - Vue
description: Learn how to combine multiple icons into a single icon using SVG in SVG in your Vue application.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Combining icons

You can combine multiple icons into a single icon by using SVG in SVG.
This is useful for if you want to be creative and make your own custom icons by combining existing icons.

::: sandpack {template=vue showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { Scan, User } from "lucide-vue-next";
</script>

<template>
  <div class="app">
    <Scan :size="48">
      <User
        :size="12"
        x="6"
        y="6"
        absoluteStrokeWidth
      />
    </Scan>
  </div>
</template>

```

:::

This is valid SVG and all SVG properties are supported on the icons.
The `x` and `y` coordinates can be adjusted to position the icons as you like.

::: info Limitation
When combining icons, you need to make sure that the `x` and `y` coordinates are within the `viewBox` of the outer icon (24x24).
:::

## With custom SVG elements

You can also use SVG elements to create your own icons.

### Example with notification badge

For example, you can add a notification badge to an icon by using the `circle` SVG element.

::: sandpack {template=vue showTabs=false editorHeight=480 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { Mail } from "lucide-vue-next";

const hasUnreadMessages = true;
</script>

<template>
  <div class="app">
    <Mail :size="48">
      <circle
        v-if="hasUnreadMessages"
        r="3"
        cx="21"
        cy="5"
        stroke="none"
        fill="#F56565"
      />
    </Mail>
  </div>
</template>

```

:::

### Example with text element

You can also use the `text` SVG element to add text to your icon.

::: sandpack {template=vue showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { File } from "lucide-vue-next";
</script>

<template>
  <div class="app">
    <File :size="48">
      <text
        x="7.5"
        y="19"
        font-size="8"
        font-family="Verdana,sans-serif"
        :stroke-width="1"
      >
        JS
      </text>
    </File>
  </div>
</template>

```

:::
