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

It's build with ES Modules so it's completely tree-shakable.

Each icon can be imported as a React component, what renders a inline SVG Element. This way only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

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

To apply custom props to change the look of the icon, this can be done by simply pass them as props to the component. All SVG attributes are available as props to style the SVGs. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return <Camera size={48} fill="red" />;
};
```

## One generic icon component

It is possible to create one generic icon component to load icons. It's not recommended.

::: danger
Example below importing all ES Modules, caution using this example. All icons will be imported. When using bundlers like: `Webpack`, `Rollup` or `Vite` the application build size will grow strongly and harming the performance the application.

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

> :warning: This is experimental and only works with bundlers that support dynamic imports.

Lucide react exports a dynamic import map `dynamicIconImports`. Useful for applications that want to show icons dynamically by icon name. For example when using a content management system with where icon names are stored in a database.

When using client side rendering, it will fetch the icon component when it's needed. This will reduce the initial bundle size.

The keys of the dynamic import map are the lucide original icon names (kebab case).

Example with React suspense:

```tsx
import React, { lazy, Suspense } from 'react';
import { dynamicIconImports, LucideProps } from 'lucide-react';

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

In NextJS [the dynamic function](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) can be used to load the icon component dynamically.

```tsx
import dynamic from 'next/dynamic'
import { dynamicIconImports, LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon {...props} />;
};

export default Icon;
```
