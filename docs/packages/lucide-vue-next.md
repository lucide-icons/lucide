# Lucide Vue Next

Implementation of the lucide icon library for Vue 3 applications.

> ⚠️ This version of lucide is for Vue 3, For Vue 2 got to [lucide-vue](lucide-vue)

## Installation

**With yarn**

```bash
yarn add lucide-vue-next
```

**With npm**

```bash
npm install lucide-vue-next
```

## How to use

It's build with ESmodules so it's completely tree-shakable.
Each icon can be imported as a vue component.

### Example

You can pass additional props to adjust the icon.

``` html
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

### Props

|  name        |   type   |  default
| ------------ | -------- | --------
| `size`       | *Number* | 24
| `color`      | *String* | currentColor
| `stroke-width`| *Number* | 2
| `default-class`| *String* | lucide-icon

### Custom props

You can also pass custom props that will be added in the svg as attributes.

``` html
<template>
  <Camera fill="red" />
</template>
```

### One generic icon component

It is possible to create one generic icon component to load icons.

> ⚠️ Example below importing all EsModules, caution using this example, not recommended when you using bundlers, your application build size will grow strongly.

#### Icon Component Example

``` html
<template>
    <component :is="icon" :size="size" :color="color" :stroke-width="strokeWidth" :default-class="defaultClass" />
</template>

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
```

##### Then you can use it like this

``` html
<template>
  <div id="app">
    <Icon name="Airplay" />
  </div>
</template>
```
All other props listed above also work on the `Icon` Component.
