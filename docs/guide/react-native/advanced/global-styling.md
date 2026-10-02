---
title: Global Styling - React Native
description: Learn how to style all Lucide icons globally in your React Native application using CSS or the Lucide context provider.
---
# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can use a context provider.

## Context Provider

For global styling using a context provider, you can use the `LucideProvider` component that is provided by the `lucide-react-native` package.

```tsx
import { LucideProvider, Home } from 'lucide-react-native';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

This will apply the `color`, `size` and `strokeWidth` props to all icons that are children of the `LucideProvider`.
