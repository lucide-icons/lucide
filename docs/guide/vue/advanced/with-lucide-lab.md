---
title: With Lucide Lab or custom icons - Vue
description: Learn how to use Lucide Lab or custom icons in your Vue applications using the Icon component.
---
# With Lucide Lab or custom icons

[Lucide Lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

They can be used by using the `Icon` component.
All props like regular lucide icons can be passed to adjust the icon appearance.

## Using the `Icon` component

This creates a single icon based on the iconNode passed and renders a Lucide icon component.

```vue
<script setup>
import { Icon } from '@lucide/vue';
import { baseball } from '@lucide/lab';
</script>

<template>
  <Icon :iconNode="baseball" />
</template>
```
