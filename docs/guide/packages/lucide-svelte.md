# Lucide Svelte

Implementation of the lucide icon library for svelte applications.

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-svelte
```

```sh [yarn]
yarn add lucide-svelte
```

```sh [npm]
npm install lucide-svelte
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Svelte component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Default usage:

```svelte
<script>
  import { Skull } from 'lucide-svelte';
</script>

<Skull />
```

Additional props can be passed to adjust the icon:

```svelte
<script>
  import { Camera } from 'lucide-svelte';
</script>

<Camera color="#ff3e98" />
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```svelte
<script>
  import { Phone } from 'lucide-svelte';
</script>

<Phone fill="#333" />
```

This results a filled phone icon.

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important when using bundlers like `Webpack`, `Rollup`, or `Vite`.
:::

### Icon Component Example

```svelte
<script>
  import * as icons from 'lucide-svelte';
  export let name;
</script>

<svelte:component this="{icons[name]}" {...$$props} />
```

#### Using the Icon Component

```svelte
<script>
  import LucideIcon from './LucideIcon';
</script>

<LucideIcon name="Menu" />
```

