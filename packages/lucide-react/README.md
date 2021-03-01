# Lucide React

Use the lucide icon library in you react app.

## Installation

```sh
yarn add lucide-react

# or

npm install lucide-react
```

## How to use

It's build with ESmodules so it's completely threeshakable.
Each icon can be imported as a react component.

### Example

You can pass additional props to adjust the icon.

``` js
import { Camera } from 'lucide-react';
// Returns ReactComponent

// Usage
const App = () => {
  return <Camera color="red" size={48}/>
};

export default App;
```

### Props

|  name        |   type   |  default
| ------------ | -------- | --------
| `size`       | *Number* | 24
| `color`      | *String* | currentColor
| `strokeWidth`| *Number* | 2

### Custom props

You can also pass custom props that will be added in the svg as attributes.

``` js
// Usage
const App = () => {
  return <Camera fill="red"/>
};
```

### One generic icon component

It is possible to create one generic icon component to load icons.

> :warning: Example below importing all EsModules, caution  using this example, not recommended when you using bundlers, your application build size will grow strongly.

#### Icon Component Example

``` js
import * as icons from 'lucide-react';

const Icon = ({name, color, size}) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />
};

export default Icon;
```
