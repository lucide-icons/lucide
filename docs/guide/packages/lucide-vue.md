# Lucide Vue

Vue 2 components for Lucide icons that integrate with Vue's Options API and template system. Each icon is a Vue component that renders as an inline SVG, providing familiar Vue development patterns for legacy applications still using Vue 2.

**What you can accomplish:**
- Use icons as Vue 2 components with Options API integration
- Maintain legacy Vue 2 applications with modern icon components
- Integrate with Vue 2's template system and component lifecycle
- Build applications using Vue 2's familiar syntax and patterns
- Bridge the gap while planning migration to Vue 3

::: danger
This package is deprecated. Vue 2 is EOF  See [Announcement](https://v2.vuejs.org/eol/). Migrate to Vue 3.
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

```sh [bun]
bun add lucide-vue
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
| `absoluteStrokeWidth`   | *boolean* | false        |
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
