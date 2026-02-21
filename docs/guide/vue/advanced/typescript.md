---
title: Typescript - Vue
description: Learn about the different types exported by the `@lucide/vue` package and how to use them in your Vue application.
---
# TypeScript Support

List of exported types from the `@lucide/vue` package.
These can be used to type your components when using Lucide icons in a TypeScript Vue project.

## `LucideProps`

Exports all props that can be passed to an icon component and any other SVG attributes, see: [SVG Presentation Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```ts
interface LucideProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  [key: string]: any; // Any other SVG attributes
}
```

### Using `LucideProps`
You can use the `LucideProps` interface to type props for your custom icon components.

::: code-group
```vue [IconWrapper.vue]
<script lang="ts" setup>
import { type LucideProps } from '@lucide/vue';
import { Camera } from '@lucide/vue';

defineProps<LucideProps>();
</script>

<template>
  <div>
    <Camera v-bind="$props" />
  </div>
</template>
```
:::

## `LucideIcon`

Type for individual icon components, this is use full when you want to type a variable or prop that holds an icon component.

```ts
type LucideIcon = React.FC<LucideProps>;
```

### Using `LucideIcon`

You can use the `LucideIcon` type when you need to work with icon components directly.

::: code-group
```vue [IconButton.vue]
<script lang="ts" setup>
import { type LucideProps } from '@lucide/vue';
import { Camera } from '@lucide/vue';

defineProps<{
  icon: LucideIcon;
  label: string;
}>();
</script>

<template>
  <button :aria-label="label">
    <component :is="icon" :size="16" />
  </button>
</template>
```
:::

## `IconNode`

Type for the raw SVG structure of an icon. This is an array of SVG elements and their attributes to render the icon.
Not commonly used directly in application code. But can be useful for advanced use cases, such as using custom icons or with Lucide lab.

```ts
type IconNode = [elementName: string, attrs: Record<string, string | number>][];
```

### Using `IconNode`
You can use the `IconNode` type when you need to work with the raw SVG structure of an icon.

::: code-group
```vue [CustomIcon.vue]
<script lang="ts" setup>
import { type IconNode, Icon } from '@lucide/vue';

const customIcon: IconNode = [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
  ['line', { x1: 12, y1: 16, x2: 12, y2: 16 }],
];
</script>

<template>
  <Icon :iconNode="customIcon" size="24" color="blue" />
</template>
```
:::
