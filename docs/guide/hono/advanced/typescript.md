---
title: TypeScript - Hono
description: Learn about the different types exported by the `@lucide/hono` package and how to use them in your Hono application.
---

# TypeScript

List of exported types from the `@lucide/hono` package.
These can be used to type your components when using Lucide icons in a TypeScript Hono project.

## `LucideProps`

Exports all props that can be passed to an icon component and any other SVG attributes, see: [SVG Presentation Attributes on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```ts
interface LucideProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  nonScalingStroke?: boolean;
  /**
   * @deprecated
   */
  absoluteStrokeWidth?: boolean;
  [key: string]: any; // Any other SVG attributes
}
```

### Using `LucideProps`

You can use the `LucideProps` interface to type your custom icon components or when you need to work with icon props.

```tsx
import { Camera, type LucideProps } from '@lucide/hono';

const WrapIcon = (props: LucideProps) => {
  return <Camera {...props} />;
};

export default WrapIcon;
```

## `LucideIcon`

Type for individual icon components.

```ts
import type { FC } from 'hono/jsx';

type LucideIcon = FC<LucideProps>;
```

### Using `LucideIcon`

You can use the `LucideIcon` type when you need to work with icon components directly.

```tsx
import { House, Library, Cog, type LucideIcon } from '@lucide/hono';

type MenuItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  { name: 'Home', href: '/', icon: House },
  { name: 'Blog', href: '/blog', icon: Library },
  { name: 'Projects', href: '/projects', icon: Cog },
];

const Menu = () => (
  <nav>
    {menuItems.map((item) => (
      <a href={item.href}>
        <item.icon />
        <span>{item.name}</span>
      </a>
    ))}
  </nav>
);
```

## `LucideIconNode`

Type for the raw SVG structure of an icon. This is an array of SVG elements and their attributes to render the icon.
Not commonly used directly in application code. But can be useful for advanced use cases, such as using custom icons or with Lucide Lab.

```ts
type LucideIconNode = [elementName: string, attrs: Record<string, any>];
```

### Using `LucideIconNode`

You can use the `LucideIconNode` type when you need to work with the raw SVG structure of an icon.

```tsx
import { Icon, type LucideIconNode } from '@lucide/hono';

const customIcon: LucideIconNode[] = [
  ['circle', { cx: 12, cy: 12, r: 10 }],
  ['line', { x1: 12, y1: 8, x2: 12, y2: 12 }],
  ['line', { x1: 12, y1: 16, x2: 12, y2: 16 }],
];

const MyIcon = () => {
  return (
    <Icon
      iconNode={customIcon}
      size={24}
      color="blue"
    />
  );
};
```
