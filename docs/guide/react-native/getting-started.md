---
title: Getting started - React Native
description: This guide will help you get started with Lucide in your React Native project.
---
<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactNativeSidebar } from '../../.vitepress/sidebar/react-native'
</script>

# Getting started

This guide will help you get started with Lucide in your React Native project.
Make sure you have a React Native environment set up. If you don't have one yet, you can create a new React Native project using React Native CLI, Expo, or any other React Native boilerplate of your choice.

## Installation

First, ensure that you have `react-native-svg` (version between 12 and 15) installed. Then, install the package:

::: code-group

```sh [pnpm]
pnpm add lucide-react-native
```

```sh [yarn]
yarn add lucide-react-native
```

```sh [npm]
npm install lucide-react-native
```

```sh [bun]
bun add lucide-react-native
```

:::

## Importing your first icon

Lucide is built with ES Modules.

Each icon can be imported as a React component, which renders an `react-native-svg` element.

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

To customize the appearance of an icon, you can pass custom properties as props directly to the component. The component accepts all SVG attributes as props, which allows flexible styling of the SVG elements. See the list of SVG Presentation Attributes on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation).

```jsx
// Usage
const App = () => {
  return <Camera size={48} fill="red" />;
};
```

More examples and details how to use props, continue the guide:

<OverviewLinkGrid>
  <OverviewLink v-for="item in reactNativeSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
