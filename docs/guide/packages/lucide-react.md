# Lucide React

Implementation of the lucide icon library for react applications

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-react
```

```sh [yarn]
yarn add lucide-react
```

```sh [npm]
npm install lucide-react
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a React component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Camera } from 'lucide-react';

// Usage
const App = () => {
  return <Camera color="red" size={48} />;
};

export default App;
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

```jsx
// Usage
const App = () => {
  return <Camera size={48} fill="red" />;
};
```

## With Lucide lab or custom icons

Lucide Lab is a collection of icons that are not part of the official lucide library.
<!-- TODO: Add link to @lucide/lab repo -->
They can be used by using the `Icon` component.
For both methods, all props like regular lucide icons can be passed to adjust the icon appearance.

### Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```jsx
import { Icon } from 'lucide-react';
import { burger } from '@lucide/lab';

const App = () => (
  <Icon iconNode={burger} />
);
```

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important to keep in mind when using bundlers like `Webpack`, `Rollup`, or `Vite`.

This is not the case for the latest NextJS, because it uses server side rendering. The icons will be streamed to the client when needed. For NextJS with Dynamic Imports, see [dynamic imports](#nextjs-example) section for more information.
:::

### Icon Component Example

```jsx
import { icons } from 'lucide-react';

const Icon = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
```

#### Using the Icon Component

```jsx
import Icon from './Icon';

const App = () => {
  return <Icon name="Home" />;
};

export default App;
```

#### With Dynamic Imports

Lucide react exports a dynamic import map `dynamicIconImports`, which is useful for applications that want to show icons dynamically by icon name. For example, when using a content management system with where icon names are stored in a database.

When using client side rendering, it will fetch the icon component when it's needed. This will reduce the initial bundle size.

The keys of the dynamic import map are the lucide original icon names (kebab case).

Example with React suspense:

```tsx
import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }}/>

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
}

export default Icon
```

##### NextJS Example

In NextJS, [the dynamic function](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) can be used to dynamically load the icon component.

To make dynamic imports work with NextJS, you need to add `lucide-react` to the [`transpilePackages`](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages) option in your `next.config.js` like this:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'] // add this
}

module.exports = nextConfig

```

You can then start using it:

```tsx
import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon {...props} />;
};

export default Icon;
```
