# Lucide Vue

Implementation of the lucide icon library for Vue applications.

::: warning
This package will be deprecated end of 2023. Vue v2 will be EOF at the end of 2023 See [Announcement](https://v2.vuejs.org/lts/). We recommend to migrate to Vue 3.
The Lucide Vue package will be only maintained for Vue 3 after the deprecation.
:::

## Vue 2 or Vue 3

::: tip
This version of lucide is for Vue 2, For Vue 3 go to [lucide-vue-next ->](lucide-vue-next)
:::

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-vue
```

```sh [yarn]
yarn add lucide-vue
```

```sh [npm]
npm install lucide-vue
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Vue component, which renders an inline SVG Element. This way only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```vue
<template>
  <Camera color="red" :size="32" />
</template>

<script>
  import { Camera } from 'lucide-vue';

  export default {
    name: 'My Component',
    components: { Camera }
  };
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

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```vue
<template>
  <Camera fill="red" />
</template>
```

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important when using bundlers like `Webpack`, `Rollup`, or `Vite`.
:::

### Icon Component Example

```vue
<template>
  <component :is="icon" />
</template>

<script>
  import * as icons from 'lucide-vue';

  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      icon() {
        return icons[this.name];
      }
    }
  };
</script>
```

#### Using the Icon Component

```vue
<template>
  <div id="app">
    <Icon name="Airplay" />
  </div>
</template>
```
