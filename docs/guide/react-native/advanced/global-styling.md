# Global Styling

Adjusting icons can be done by using [color](../basics/color.md), [size](../basics/sizing.md) and [stroke width](../basics/stroke-width.md).
To style all icons globally, you can either use CSS, or use a context provider.

We recommend using CSS for global styling, as it is the most straightforward way to achieve this.
But using CSS prevents you from using props like `size`, `color` and `strokeWidth` on individual icons, since CSS specificity will override these props, to be able to use the props on individual ones you need to use the Lucide context provider.

## Context Provider

For global styling using a context provider, you can use the `LucideProvider` component that is provided by the `lucide-react` package.

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
