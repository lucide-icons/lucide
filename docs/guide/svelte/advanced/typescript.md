# TypeScript Support

List of exported types from the `@lucide/svelte` package.
These can be used to type your components when using Lucide icons in a TypeScript Vue project.

## `LucideProps`

Exports all props that can be passed to an icon component and any other SVG attributes, see: [SVG Presentation Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```ts
interface LucideProps extends SVGAttributes<SVGSVGElement> {
  name?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  children?: Snippet;
  [key: string]: any; // Any other SVG attributes
}
```

### Using `LucideProps`
You can use the `LucideProps` interface to type props for your custom icon components.

::: code-group
```svelte [IconWrapper.svelte]
<script lang="ts">
import { Camera, type LucideProps } from '@lucide/svelte';

let props: LucideProps = $props();
</script>

<template>
  <div class>
    <Camera v-bind="$props" />
  </div>
</template>
```
:::

## `LucideIcon`

Type for individual icon components, this is use full when you want to type a variable or prop that holds an icon component.

```ts
import type { Component } from 'svelte';

type LucideIcon = Component<LucideProps>
```

### Using `LucideIcon`

You can use the `LucideIcon` type when you need to work with icon components directly.

::: code-group

```svelte [Svelte 5]
<script lang="ts">
  import { Home, Library, Cog, type LucideIcon } from '@lucide/svelte';

  type MenuItem = {
    name: string;
    href: string;
    icon: LucideIcon;
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: Library
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Cog
    }
  ];
</script>

{#each menuItems as item}
  {@const Icon = item.icon}
  <a href={item.href}>
    <Icon />
    <span>{item.name}</span>
  </a>
{/each}
```

```svelte [Svelte 4]
<script lang="ts">
  import { Home, Library, Cog, type Icon } from '@lucide/svelte';
  import type { ComponentType } from 'svelte';

  type MenuItem = {
    name: string;
    href: string;
    icon: ComponentType<Icon>;
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: Library
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Cog
    }
  ];
</script>

{#each menuItems as item}
  {@const Icon = item.icon}
  <a href={item.href}>
    <Icon />
    <span>{item.name}</span>
  </a>
{/each}

```
:::

## `IconNode`

Type for the raw SVG structure of an icon. This is an array of SVG elements and their attributes to render the icon.
Not commonly used directly in application code. But can be useful for advanced use cases, such as using custom icons or with Lucide lab.

```ts
type IconNode = [
  elementName: 'circle' | 'ellipse'| 'g' | 'line' | 'path' | 'polygon' | 'polyline' | 'rect',
  attrs: SVGAttributes<SVGSVGElement>
][];
```

### Using `IconNode`
You can use the `IconNode` type when you need to work with the raw SVG structure of an icon.

::: code-group
```svelte [CustomIcon.svelte]
<script lang="ts">
import { type IconNode, Icon } from '@lucide/svelte';

const customIcon: IconNode = [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
  ['line', { x1: 12, y1: 16, x2: 12, y2: 16 }],
];
</script>

<Icon iconNode={customIcon} size="24" color="blue" />
```
:::
