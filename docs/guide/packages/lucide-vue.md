# Lucide Vue

Vue 2 components for Lucide icons that integrate with Vue's Options API and template system. Each icon is a Vue component that renders as an inline SVG, providing familiar Vue development patterns for legacy applications still using Vue 2.

**What you can accomplish:**
- Use icons as Vue 2 components with Options API integration
- Maintain legacy Vue 2 applications with modern icon components
- Integrate with Vue 2's template system and component lifecycle
- Build applications using Vue 2's familiar syntax and patterns
- Bridge the gap while planning migration to Vue 3

## Installation

::: code-group

```sh [pnpm]
pnpm add @lucide/vue
```

```sh [yarn]
yarn add @lucide/vue
```

```sh [npm]
npm install @lucide/vue
```

```sh [bun]
bun add @lucide/vue
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Vue component, which renders an inline SVG Element. This way only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

You can pass additional props to adjust the icon.

```vue
<script setup>
import { Camera } from '@lucide/vue';
</script>

<template>
  <Camera
    color="red"
    :size="32"
  />
</template>
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

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like regular lucide icons can be passed to adjust the icon appearance.

### Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```vue
<script setup>
import { Icon } from '@lucide/vue';
import { baseball } from '@lucide/lab';
</script>

<template>
  <Icon :iconNode="baseball" />
</template>
```

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important when using bundlers like `Webpack`, `Rollup`, or `Vite`.
:::

### Icon Component Example

```vue
<script setup>
import { computed } from 'vue';
import * as icons from "@lucide/vue";

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

## Accessibility

By default, we hide icons from screen readers using `aria-hidden="true"`.

You can add accessibility attributes using aria-labels.

```vue
<script setup>
import { Check } from 'lucide-vue-next';
</script>

<template>
  <Check
    color="red"
    :size="32"
    aria-label="Task completed"
  />
</template>
```

For best practices on accessibility, please see our [accessibility guide](../accessibility.md).
