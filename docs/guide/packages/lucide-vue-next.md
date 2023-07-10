# Lucide Vue Next

Implementation of the lucide icon library for Vue 3 applications.

## Vue 3 or Vue 2

::: tip
This version of lucide is for Vue 3, For Vue 2 got to [lucide-vue ->](lucide-vue)
:::

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-vue-next
```

```sh [yarn]
yarn add lucide-vue-next
```

```sh [npm]
npm install lucide-vue-next
```

:::

## How to use

It's build with ES Modules so it's completely tree-shakable.

Each icon can be imported as a Vue component, what renders a inline SVG Element. This way only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

You can pass additional props to adjust the icon.

```vue
<template>
  <Camera
    color="red"
    :size="32"
  />
</template>

<script setup>
import { Camera } from 'lucide-vue-next';
</script>
```

## Props

|  name                   |   type    |  default     |
| ----------------------- | --------- | ------------ |
| `size`                  | *number*  | 24           |
| `color`                 | *string*  | currentColor |
| `stroke-width`          | *number*  | 2            |
| `absolute-stroke-width` | *boolean* | false        |
| `default-class`         | *string*  | lucide-icon  |

### Applying props

To apply custom props to change the look of the icon, this can be done by simply pass them as props to the component. All SVG attributes are available as props to style the SVGs. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```vue
<template>
  <Camera fill="red" />
</template>
```

## One generic icon component

It is possible to create one generic icon component to load icons. It's not recommended.

::: danger
Example below importing all ES Modules, caution using this example. All icons will be imported. When using bundlers like: `Webpack`, `Rollup` or `Vite` the application build size will grow strongly and harming the performance the application.
:::

### Icon Component Example

```vue
<script setup>
import { computed } from 'vue';
import * as icons from "lucide-vue-next";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: Number,
  color: String,
  strokeWidth: Number,
  defaultClass: String
})

const icon = computed(() => icons[props.name]);
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth" :default-class="defaultClass"
  />
</template>
```

### Using the Icon Component

All other props listed above also work on the `Icon` Component.

```vue
<template>
  <div id="app">
    <Icon name="Airplay" />
  </div>
</template>
```
