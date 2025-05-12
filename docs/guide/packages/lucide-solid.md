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

```sh [bun]
bun add lucide-solid
```

:::

## How to use

Lucide is built with ES Modules, so it's completely tree-shakable.

Each icon can be imported as a Solid component, which renders an inline SVG element. This way, only the icons that are imported into your project are included in the final bundle. The rest of the icons are tree-shaken away.

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

Vite loading/performing issues with the dev server can be resolved by import icons directly from the `lucide-solid/icons` directory:

```jsx
import Camera from 'lucide-solid/icons/camera';

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

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like the regular Lucide icons can be passed to adjust the icon appearance.

### Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```jsx
import { Icon } from 'lucide-solid';
import { sausage } from '@lucide/lab';

const App = () => (
  <Icon iconNode={sausage} color="red"/>
);
```

## One generic icon component

It is possible to create one generic icon component to load icons. It's not recommended.

::: danger
The example below imports all ES Modules, so exercise caution when using it. Importing all icons will significantly increase the build size of the application, negatively affecting its performance. This is especially important  to keep in mind when using bundlers like `Webpack`, `Rollup`, or `Vite`.
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
