# Lucide Vue Next

Implementation of the lucide icon library for Vue 3 applications.

> What is lucide? Read it [here](https://github.com/lucide-icons/lucide#what-is-lucide).

> :warning: This version of lucide is for Vue 3, For Vue 2 got to [lucide-vue-next](https://github.com/lucide-icons/lucide/tree/master/packages/lucide-vue#lucide-vue)

## Installation

```sh
yarn add lucide-vue-next

# or

npm install lucide-vue-next
```

## How to use

It's build with ESmodules so it's completely threeshakable.
Each icon can be imported as a vue component.

### Example

You can pass additional props to adjust the icon.

``` vue
<template>
  <Camera
    color="red"
    :size="32"
  />
</template>

<script>
// Returns Vue component
import { Camera } from 'lucide-vue-next';

export default {
  name: "My Component",
  components: { Camera }
}

</script>
```

### Props

|  name        |   type   |  default
| ------------ | -------- | --------
| `size`       | *Number* | 24
| `color`      | *String* | currentColor
| `strokeWidth`| *Number* | 2
| `defaultClass`| *String* | lucide-icon

### Custom props

You can also pass custom props that will be added in the svg as attributes.

``` vue
<template>
  <Camera fill="red" />
</template>
```

### One generic icon component

It is possible to create one generic icon component to load icons.

> :warning: Example below importing all EsModules, caution using this example, not recommended when you using bundlers, your application build size will grow strongly.

#### Icon Component Example

``` vue
<template>
  <component :is="icon" />
</template>

<script>
import * as icons from "lucide-vue-next";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      return icons[this.name];
    },
  },
};
</script>
```

##### Then you can use it like this

``` vue
<template>
  <div id="app">
    <Icon name="Airplay" />
  </div>
</template>
```
