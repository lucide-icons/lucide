---
title: With Lucide lab or custom icons - Solid
description: Learn how to use Lucide lab or custom icons in your Solid applications using the Icon component.
---
# With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like regular lucide icons can be passed to adjust the icon appearance.

## Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```tsx
import { Icon } from 'lucide-solid';
import { coconut } from '@lucide/lab';

const App = () => (
  <Icon iconNode={coconut} />
);
```
