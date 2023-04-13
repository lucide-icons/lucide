# Lucide Vue

Implementation of the lucide icon library for Vue applications.

> ⚠️ This version of lucide is for Vue 2, For Vue 3 got to [lucide-vue-next](lucide-vue-next)

## Installation

```sh
yarn add lucide-vue
```

or

```sh
npm install lucide-vue
```

## How to use

It's build with ESmodules so it's completely tree-shakable.
Each icon can be imported as a vue component.

### Example

You can pass additional props to adjust the icon.

```html
<template>
  <Camera color="red" :size="32" />
</template>

<script>
  // Returns Vue component
  import { Camera } from 'lucide-vue';

  export default {
    name: 'My Component',
    components: { Camera }
  };
</script>
```

### Props

| name           | type     | default      |
| -------------- | -------- | ------------ |
| `size`         | _Number_ | 24           |
| `color`        | _String_ | currentColor |
| `strokeWidth`  | _Number_ | 2            |
| `defaultClass` | _String_ | lucide-icon  |

### Custom props

You can also pass custom props that will be added in the svg as attributes.

```html
<template>
  <Camera fill="red" />
</template>
```

### One generic icon component

It is possible to create one generic icon component to load icons.

> ⚠️ Example below importing all EsModules, caution using this example, not recommended when you using bundlers, your application build size will grow strongly.

#### Icon Component Example

```html
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

##### Then you can use it like this

```html
<template>
  <div id="app">
    <Icon name="Airplay" />
  </div>
</template>
```
