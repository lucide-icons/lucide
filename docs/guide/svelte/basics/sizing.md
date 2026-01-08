<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackSvelte.vue'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

::: sandpack {template=vite-svelte showTabs=false editorHeight=240 editorWidthPercentage=60}

```svelte src/App.svelte [active]
<script>
import Landmark from '@lucide/svelte/icons/landmark';
</script>

<Landmark size={64} />
```
:::

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

::: sandpack {template=vite-svelte editorHeight=240 editorWidthPercentage=60}

```css src/icon.css [active]
.my-beer-icon {
  /* Change this! */
  width: 64px;
  height: 64px;
}
```

```svelte src/App.svelte
<script>
import Beer from "@lucide/svelte/icons/beer";
import './icon.css'
</script>

<Beer class="my-beer-icon" />
```

:::

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

::: sandpack {template=vite-svelte editorHeight=300}

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

```svelte src/App.svelte
<script>
import Star from "@lucide/svelte/icons/star";
import "./icon.css";
</script>

<div class="text-wrapper">
  <Star class="my-icon" />
  <div>Yes</div>
</div>
```
:::

### Resizing with Tailwind

`size-*` utilities can be used to adjust the size of the icon. See the [Tailwind documentation](https://tailwindcss.com/docs/width#setting-both-width-and-height) for more information on the `size-*` utilities.

::: sandpack {template=vite-svelte showTabs=false editorHeight=240 editorWidthPercentage=60}

```svelte src/App.svelte [active]
<script>
import PartyPopper from "@lucide/svelte/icons/party-popper";
</script>

<PartyPopper class="size-24" />
```

```html /index.html [hidden]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
:::
