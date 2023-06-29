# Lucide React Native

Implementation of the lucide icon library for React Native applications

## Installation

First, ensure that you have `react-native-svg@^12.0.0` installed. Then, install the package:

::: code-group

```sh [pnpm]
pnpm install lucide-react-native
```

```sh [yarn]
yarn add lucide-react-native
```

```sh [npm]
npm install lucide-react-native
```

:::

## How to use

Each icon can be imported as a React component.

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Camera } from 'lucide-react-native';

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

To apply custom props to change the look of the icon, this can be done by simply pass them as props to the component.

```jsx
// Usage
const App = () => {
  return <Camera fill="red" />;
};
```

## One generic icon component

It is possible to create one generic icon component to load icons.

::: warning
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
