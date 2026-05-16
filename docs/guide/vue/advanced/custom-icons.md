---
title: Custom Icons - Vue
description: Learn how to create custom icons and use icons from Lucide Lab in your Vue application.
---

<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackVue.vue'
</script>

# Custom icons

You can build your own icons using the same tools Lucide uses internally. You can also use icons from [Lucide Lab](https://github.com/lucide-icons/lucide-lab), a collection of community extras that are not part of the main library.

## Designing icons

Icons should follow the Lucide design rules: a 24x24 canvas, 2px stroke with round caps and joins, proper border radii, 2px element spacing, and balanced optical volume. See the [icon design guide](/contribute/icon-design-guide) for the full spec with samples.

You can use any vector editor. Setup guides are available for [Adobe Illustrator](/contribute/illustrator-guide), [Inkscape](/contribute/inkscape-guide), [Figma](/contribute/figma-guide), and [Affinity Designer](/contribute/affinity-designer-guide).

### Validating and formatting with Lucide Studio

[Lucide Studio](https://studio.lucide.dev/) is a web-based SVG editor that validates your icon against the design rules. It enforces the `24x24` viewBox, applies correct stroke attributes, and rounds coordinates to 3 decimal places with the Tidy button. In the preview your can also see clear violations with the Lucide icons conventions.

You can also paste existing Lucide icons into Studio to tweak them.

Export: Open Share and pick Copy data code to clipboard to get an `IconNode` array ready for `createLucideIcon`.

## Understanding `IconNode`

Every Lucide icon is an `IconNode`. It is an array of tuples, where each tuple describes one SVG element.

```ts
type IconNode = [elementName: string, attrs: Record<string, string | number>][];
```

Each entry says "draw this element with these attributes". The `key` attribute is required because Vue needs it to keep track of things.

```ts
import type { IconNode } from '@lucide/vue';

const myIconNode: IconNode = [
  ['circle', { cx: '12', cy: '12', r: '10', key: '1' }],
  ['path', { d: 'M12 6v6l4 2', key: '2' }],
];
```

## Creating a reusable custom icon with `createLucideIcon`

`createLucideIcon` is the same factory Lucide uses to build every icon in the library. Give it a name and an `IconNode`, and it returns a full Vue component.

```vue
<script setup>
import { createLucideIcon } from '@lucide/vue';
import type { IconNode } from '@lucide/vue';

const iconNode: IconNode = [
  ['circle', { cx: '12', cy: '12', r: '10', key: 'circle' }],
  ['path', { d: 'M12 6v6l4 2', key: 'path' }],
];

const Clock = createLucideIcon('clock', iconNode);
</script>

<template>
  <Clock
    :size="48"
    color="#4f46e5"
  />
</template>
```

The component you get back works like any other Lucide icon. It supports `size`, `color`, `strokeWidth`, and `absoluteStrokeWidth`.

You can also skip writing the `IconNode` by hand. Design it in [Lucide Studio](https://studio.lucide.dev/), then use Share > Copy data code to clipboard.

::: sandpack {template=vue showTabs=false editorHeight=300 editorWidthPercentage=60 dependencies="@lucide/vue"}

```vue src/App.vue [active]
<script setup>
import { createLucideIcon } from '@lucide/vue';

const PinIcon = createLucideIcon('pin', [
  ['circle', { cx: '12', cy: '12', r: '10', key: 'circle' }],
  ['circle', { cx: '12', cy: '12', r: '3', key: 'dot' }],
]);
</script>

<template>
  <PinIcon color="#e11d48" />
</template>
```

:::

## With Lucide Lab

[Lucide Lab](https://github.com/lucide-icons/lucide-lab) is a collection of community-contributed icons that are not part of the main library.

Install it alongside `@lucide/vue`:

::: code-group

```sh [pnpm]
pnpm add @lucide/lab
```

```sh [yarn]
yarn add @lucide/lab
```

```sh [npm]
npm install @lucide/lab
```

```sh [bun]
bun add @lucide/lab
```

:::

Lab icons ship as `IconNode` objects, so they work directly with the `Icon` component.

```vue
<script setup>
import { Icon } from '@lucide/vue';
import { baseball } from '@lucide/lab';
</script>

<template>
  <Icon :iconNode="baseball" />
</template>
```

All the usual props (`size`, `color`, `strokeWidth`, `absoluteStrokeWidth`) work the same way.

## Styling and props

Custom icons accept the same props as the built-in ones: `size`, `color`, `strokeWidth`, `absoluteStrokeWidth`, plus any SVG attribute you would normally use.

They also respect the defaults you set with `setLucideProps`. Check out [Global Styling](./global-styling) for more on that.

CSS targeting works through the class names Lucide generates:

- Every icon gets the `lucide` class.
- Icons made with `createLucideIcon('my-icon', ...)` get `lucide-my-icon` and `lucide-my-icon-icon`.
- Icons rendered with the `Icon` component get `lucide-{name}` from whatever you pass as `name`.

## Consider Contributing

If your icon follows the design guide, consider [contributing it](/contribute/) to the official Lucide set! The library thrives on community contributions.

Open a pull request with your icon's SVG, a JSON metadata descriptor with tags and categories, and a clear description of what the icon represents. Review the [contribution guide](/contribute/) and [icon design guide](/contribute/icon-design-guide) for the full requirements before submitting.
