# Lucide React Native

Implementation of the lucide icon library for React Native applications

## Installation

First, ensure that you have `react-native-svg` (version between 12 and 14) installed. Then, install the package:

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

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements.

```jsx
// Usage
const App = () => {
  return <Camera fill="red" />;
};
```

## One generic icon component

It is possible to create one generic icon component to load icons, but it is not recommended.

::: warning
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important  to keep in mind when using bundlers like `Webpack`, `Rollup`, or `Vite`.
:::

### Icon Component Example

```jsx
import { icons } from 'lucide-react-native';

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
