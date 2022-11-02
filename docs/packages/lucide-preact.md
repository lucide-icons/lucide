---
title: Lucide Preact
---

# Lucide Preact

Implementation of the lucide icon library for preact applications.

## Installation

```sh
yarn add lucide-preact
```

or

```sh
npm install lucide-preact
```

## How to use

It's build with ESmodules so it's completely tree-shakable.
Each icon can be imported as a preact component.

### Example

You can pass additional props to adjust the icon.

```js
import { Camera } from 'lucide-preact';
// Returns PreactComponent

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

> svg attributes in preact aren't transformed, so if want to change e.g. the `stroke-linejoin` you need to pass it in kebabcase, the way svg spec is written so. See this topic in the [preact documentation](https://preactjs.com/guide/v10/differences-to-react/#svg-inside-jsx).

### One generic icon component

It is possible to create one generic icon component to load icons.

> ⚠️ Example below importing all EsModules, caution using this example, not recommended when you using bundlers, your application build size will grow strongly.

#### Icon Component Example

```js
import * as icons from 'lucide-preact';

const Icon = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
```
