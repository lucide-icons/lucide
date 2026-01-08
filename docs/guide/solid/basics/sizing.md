<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

::: sandpack {template=vite-solid showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import Landmark from 'lucide-solid/icons/landmark';

function App() {
  return (
    <div class="app">
      <Landmark size={64} />
    </div>
  );
}

export default App;
```
:::

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: sandpack {template=vite-solid editorHeight=300 dependencies="lucide-solid"}

```css icon.css [active]
.my-beer-icon {
  /* Change this! */
  width: 64px;
  height: 64px;
}
```

```tsx App.tsx
import Beer from 'lucide-solid/icons/beer';

import "./icon.css";

function App() {
  return (
    <div class="app">
      <Beer class="my-beer-icon" />
    </div>
  );
}

export default App;

```
:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: sandpack {template=vite-solid editorHeight=300 dependencies="lucide-solid"}

```css icon.css [active]
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

```tsx App.tsx
import Star from 'lucide-solid/icons/star';
import "./icon.css";

function App() {
  return (
    <div class="text-wrapper">
      <Star class="my-icon" />
      <div>Yes</div>
    </div>
  );
}

export default App;
```

:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

::: sandpack {template=vite-solid editorHeight=300 editorWidthPercentage=60 dependencies="lucide-solid" externalResources="https://cdn.tailwindcss.com"}

```tsx App.tsx [active]
import PartyPopper from 'lucide-solid/icons/party-popper';

function App() {
  return (
    <div>
      <PartyPopper class="size-24" />
    </div>
  );
}

export default App;
```
:::
