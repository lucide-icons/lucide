# Lucide Solid

Implementation of the lucide icon library for solid applications.

## Installation

::: code-group

```sh [pnpm]
pnpm install lucide-solid
```

```sh [yarn]
yarn add lucide-solid
```

```sh [npm]
npm install lucide-solid
```

:::

## How to use

It's build with ES Modules so it's completely tree-shakable.

Each icon can be imported as a Solid component, what renders a inline SVG Element. This way only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Camera } from 'lucide-solid';

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
  return <Camera fill="red" stroke-linejoin="bevel" />;
};
```

## One generic icon component

It is possible to create one generic icon component to load icons. It's not recommended.

::: danger
Example below importing all ES Modules, caution using this example. All icons will be imported. When using bundlers like: `Webpack`, `Rollup` or `Vite` the application build size will grow strongly and harming the performance the application.
:::

### Icon Component Example

```tsx
import { icons, type LucideProps } from 'lucide-solid';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = (props: IconProps) => {
  const [local, others] = splitProps(props, ["name"]);

  return <Dynamic component={icons[local.name]} {...others} />
};

export default Icon;
```

#### Using the Icon Component

```tsx
import Icon from './Icon';

const App = () => {
  return <Icon name="home" />;
};

export default App;
```
