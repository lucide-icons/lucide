---
title: Optimizations - React Native
description: Learn how to optimize the bundle size of your React Native and Expo web exports by tree-shaking Lucide icons.
---

# Optimizations

By default you import icons from the `lucide-react-native` entry point:

```jsx
import { Camera } from 'lucide-react-native';
```

This is convenient, but it relies on the bundler to _tree-shake_ the entry point (a "barrel" file that re-exports every icon) so that only the icons you actually use end up in your bundle.

On native platforms this is usually fine. On **web exports** it can be a problem, because the Metro bundler is currently not very good at tree-shaking barrel imports and may include **all** icons in your final bundle.

## The Metro tree-shaking limitation

When you build for web with Expo (`expo export --platform web`), Metro is used to bundle your JavaScript. Metro bundles modules on-demand and, by default, does not remove unused exports from a barrel file.

This means an import like the one below can pull in the entire icon set, even though only a single icon is rendered:

```jsx
// May bundle every Lucide icon on web exports
import { Camera } from 'lucide-react-native';
```

Expo documents an experimental optimization for [React Native web imports](https://docs.expo.dev/guides/tree-shaking/#react-native-web-imports) and for [removing unused imports and exports](https://docs.expo.dev/guides/tree-shaking/#remove-unused-imports-and-exports). In practice this tree-shaking does **not** currently work reliably for `lucide-react-native` barrel imports, so the unused icons are not removed from web exports.

## Recommended: import icons individually

To guarantee that only the icons you use are bundled — regardless of the bundler's tree-shaking capabilities — import each icon directly from its own module:

```jsx
import Camera from 'lucide-react-native/icons/camera';

// Usage
const App = () => {
  return <Camera />;
};

export default App;
```

Because each icon lives in its own file, the bundler only ever includes the icons you explicitly import. This keeps your web export small without depending on Metro's experimental tree-shaking.

The icon module name is the [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) version of the icon name. For example, the `ArrowRight` icon is imported from `lucide-react-native/icons/arrow-right`:

```jsx
import ArrowRight from 'lucide-react-native/icons/arrow-right';
```

::: tip
Individual icon imports work identically on native and web, so you can safely use this style across your whole project to keep bundles as small as possible on every platform.
:::
