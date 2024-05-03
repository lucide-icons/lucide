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

For faster builds and load times, you can import icons directly from the `lucide-svelte/icons` directory:

```svelte
<script>
  import AlertCircle from 'lucide-svelte/icons/alert-circle';
</script>

<AlertCircle color="#ff3e98" />
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | _number_  | 24           |
| `color`               | _string_  | currentColor |
| `strokeWidth`         | _number_  | 2            |
| `absoluteStrokeWidth` | _boolean_ | false        |

### Applying props

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```svelte
<script>
  import { Phone } from 'lucide-svelte';
</script>

<Phone fill="#333" />
```

This results a filled phone icon.

## Types

The package includes type definitions for all icons. This is useful if you want to dynamically load icons with the `svelte:component` directive whether you are using TypeScript or JSDoc.

### TypeScript Example

```svelte
<script lang="ts">
  import Home from 'lucide-svelte/icons/home';
  import Library from 'lucide-svelte/icons/library';
  import Cog from 'lucide-svelte/icons/cog';
  import type { ComponentType } from 'svelte';
  import type { Icon } from 'lucide-svelte';

  type MenuItem = {
    name: string;
    href: string;
    icon: ComponentType<Icon>;
  }

  const menuItems: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: Library,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Cog,
    }
  ];
</script>

{#each menuItems as item}
  <a href={item.href}>
   <svelte:component this={item.icon} />
    <span>{item.name}</span>
  </a>
{/each}
```

### JSDoc Example

```svelte
<script>
  import Home from 'lucide-svelte/icons/home';
  import Library from 'lucide-svelte/icons/library';
  import Cog from 'lucide-svelte/icons/cog';

  /**
   * @typedef {Object} MenuItem
   * @property {string} name
   * @property {string} href
   * @property {import('svelte').ComponentType<import('lucide-svelte').Icon>} icon
   */

  /** @type {MenuItem[]} */
  const menuItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: Library,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Cog,
    }
  ];
</script>
```

For more details about typing the `svelte:component` directive, see the [Svelte documentation](https://svelte.dev/docs/typescript#types-componenttype).

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like the regular Lucide icons can be passed to adjust the icon appearance.

### Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```svelte
<script>
import { Icon } from 'lucide-svelte';
import { burger, sausage } from '@lucide/lab';
</script>

<Icon iconNode={burger} />
<Icon iconNode={sausage} color="red"/>
```

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
