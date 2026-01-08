<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

::: sandpack {template=vue showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="lucide-vue-next"}

```vue src/App.vue [active]
<script setup>
import { Landmark } from 'lucide-vue-next'
</script>

<template>
  <Landmark :size="64" />
</template>
```

:::


## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: sandpack {template=vue editorHeight=300 dependencies="lucide-vue-next"}

```css src/icon.css [active]
.my-beer-icon {
  /* Change this! */
  width: 64px;
  height: 64px;
}
```

```vue src/App.vue
<script setup>
import { Beer } from "lucide-vue-next";
import './icon.css'
</script>

<template>
  <Beer class="my-beer-icon" />
</template>
```
:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: sandpack {template=vue editorHeight=300 dependencies="lucide-vue-next"}

```css src/icon.css [active]
.my-icon {
  /* Icon size will relative to font-size of .text-wrapper */
  width: 1em;
  height: 1em;
}

.text-wrapper {
  /* Change this! */
  font-size: 96px;

  /* layout stuff */
  display: flex;
  gap: 0.25em;
  align-items: center;
}
```

```vue src/App.vue
<script setup>
import { Star } from "lucide-vue-next";
import "./icon.css";
</script>

<template>
  <div className="text-wrapper">
    <Star class="my-icon" />
    <div>Yes</div>
  </div>
</template>

```
:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

::: sandpack {template=vue editorHeight=300 editorWidthPercentage=60 dependencies="lucide-vue-next" externalResources="https://cdn.tailwindcss.com"}

```vue src/App.vue [active]
<script setup>
import { PartyPopper } from "lucide-vue-next";
</script>

<template>
  <div>
    <PartyPopper class="size-24" />
  </div>
</template>
```
:::
