# Lucide Solid

Implementation of the lucide icon library for solid applications.

> What is lucide? Read it [here](https://github.com/lucide-icons/lucide#what-is-lucide).

## Installation

```sh
yarn add lucide-solid
```

or

```sh
npm install lucide-solid
```

## How to use

It's build with ESmodules so it's completely tree-shakable.
Each icon can be imported as a solid component.

### Example

You can pass additional props to adjust the icon.

```js
import { Camera } from 'lucide-solid';
// Returns SolidComponent

// Usage
const App = () => {
  return <Camera color="red" size={48} />;
};

export default App;
```

### Props

| name          | type     | default      |
| ------------- | -------- | ------------ |
| `size`        | _Number_ | 24           |
| `color`       | _String_ | currentColor |
| `strokeWidth` | _Number_ | 2            |

### Custom props / svg attributes

You can also pass custom props that will be added in the as attributes. With that you can modify the icons look by passing svg attributes.

```js
// Usage
const App = () => {
  return <Camera fill="red" stroke-linejoin="bevel" />;
};
```

### One generic icon component

It is possible to create one generic icon component to load icons.

> :warning: Example below importing all EsModules, caution using this example, not recommended when you using bundlers, your application build size will grow strongly.

#### Icon Component Example

```tsx
import * as icons from 'lucide-solid';
import type { LucideProps } from 'lucide-solid';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

const Icon = (props: { name: keyof typeof icons } & LucideProps) => {
  const [local, others] = splitProps(props, ["name"]);

  return <Dynamic component={icons[local.name]} {...others} />
};

export default Icon;
```
