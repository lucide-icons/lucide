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
  return <Icon name="home" />;
};

export default App;
```
