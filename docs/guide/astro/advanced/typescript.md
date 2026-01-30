---
title: TypeScript Support - Astro
description: Learn about the TypeScript types exported by the @lucide/astro package.
---

# TypeScript Support

List of exported types from the `@lucide/astro` package.
These can be used to type your components when using Lucide icons in a TypeScript Astro project.

## `LucideProps`

Exports all props that can be passed to an icon component and any other SVG attributes, see: [SVG Presentation Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```ts
interface LucideProps extends SVGAttributes<SVGSVGElement> {
  name?: string;
  color?: string;
  size?: number | string;
  'stroke-width'?: number | string;
  absoluteStrokeWidth?: boolean;
  [key: string]: any; // Any other SVG attributes
}
```

### Using `IconProps`
<!-- Rename this to LucideProps -->
You can use the `IconProps` interface to type props for your custom icon components.

```astro
---
import { icons, type IconProps } from '@lucide/astro';

interface Props extends IconProps {
  name: keyof typeof icons;
}

const { name, ...restProps } = Astro.props;
const Icon = icons[name];
---

<Icon {...restProps} />
```

## `LucideIcon`

Type for individual icon components, this is use full when you want to type a variable or prop that holds an icon component.

```ts
import type { Component } from 'astro/types';
import type { IconProps } from '@lucide/astro';

type LucideIcon = Component<IconProps>
```

### Using `LucideIcon`

You can use the `LucideIcon` type when you need to work with icon components directly.

```astro
---
import { House, Library, Cog, type Icon as IconType } from '@lucide/astro';

type MenuItem = {
  name: string;
  href: string;
  icon: typeof IconType;
};

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: House,
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
  },
];
---

{
  menuItems.map((item) => (
    <a href={item.href}>
      <item.icon />
      <span>{item.name}</span>
    </a>
  ))
}
```

## `IconNode`

Type for the raw SVG structure of an icon. This is an array of SVG elements and their attributes to render the icon.
Not commonly used directly in application code. But can be useful for advanced use cases, such as using custom icons or with Lucide lab.

```ts
type IconNode = [
  elementName: 'circle' | 'ellipse'| 'g' | 'line' | 'path' | 'polygon' | 'polyline' | 'rect',
  attrs: HTMLAttributes<'svg'>
][];
```

### Using `IconNode`
You can use the `IconNode` type when you need to work with the raw SVG structure of an icon.

```astro [CustomIcon.astro]
---
import { type IconNode, Icon } from '@lucide/astro';

const customIcon: IconNode = [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
  ['line', { x1: 12, y1: 16, x2: 12, y2: 16 }],
];
---

<Icon iconNode={customIcon} size="24" color="blue" />
```
