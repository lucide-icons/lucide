---
title: Lucide Preact
---

# Lucide Preact

Preact components for Lucide icons that provide React-like development experience with a smaller footprint. Each icon is a lightweight Preact component that renders as an inline SVG, perfect for applications that need React compatibility with minimal bundle size.

**What you can accomplish:**
- Use icons as Preact components with React-like syntax and patterns
- Build lightweight applications with Preact's smaller runtime
- Create fast, responsive interfaces with minimal JavaScript overhead
- Maintain React compatibility while reducing bundle size
- Integrate with existing Preact applications and component libraries

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-preact
```

```sh [yarn]
yarn add lucide-preact
```

```sh [npm]
npm install lucide-preact
```

```sh [bun]
bun add lucide-preact
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Preact component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Camera } from 'lucide-preact';

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
  return <Camera fill="red" stroke-linejoin="bevel" />;
};
```

> SVG attributes in Preact aren't transformed, so if you want to change for example the `stroke-linejoin` you need to pass it in kebabcase. Basically how the SVG spec want you to write it. See this topic in the [Preact documentation](https://preactjs.com/guide/v10/differences-to-react/#svg-inside-jsx).

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like regular lucide icons can be passed to adjust the icon appearance.

### Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```jsx
import { Icon } from 'lucide-preact';
import { coconut } from '@lucide/lab';

const App = () => (
  <Icon iconNode={coconut} />
);
```

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important when using bundlers like `Webpack`, `Rollup`, or `Vite`.
:::

### Icon Component Example

```jsx
import { icons } from 'lucide-preact';

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
  return <Icon name="house" />;
};

export default App;
```
