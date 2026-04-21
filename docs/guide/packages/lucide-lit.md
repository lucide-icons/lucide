---
title: Lucide Lit
---

# Lucide Lit

Lit custom elements for Lucide icons. Each default export is a `LitElement` subclass registered under a `lucide-*` tag name. Icons render an SVG inside the shadow root.

**What you can accomplish:**

- Use icons as standard custom elements in HTML or Lit templates
- Share icons across frameworks that support web components
- Tree-shake unused icons by importing only what you need from `lucide-lit`

## Installation

::: code-group

```sh [pnpm]
pnpm add lucide-lit
```

```sh [yarn]
yarn add lucide-lit
```

```sh [npm]
npm install lucide-lit
```

```sh [bun]
bun add lucide-lit
```

:::

Also install `lit` (peer dependency), matching the 3.x line your application uses.

## How to use

Lucide is published as ES modules, so unused icons can be tree-shaken when you import from the package entry.

### Example

```html
<script type="module">
  import { Camera } from 'lucide-lit';
  void Camera;
</script>

<lucide-camera size="48" class="text-red-500"></lucide-camera>
```

The `Camera` import registers `<lucide-camera>`; you can use the tag without referencing the constructor.

Properties map to attributes where applicable (`size`, `color`, `stroke-width` via `strokeWidth`, `class`).

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

Additional attributes such as `aria-label`, `title`, and `role` are forwarded to the inner SVG when set.

## With Lucide Lab or custom icons

Use `createLucideIcon` with an `iconNode` from [`@lucide/lab`](https://github.com/lucide-icons/lucide-lab), or pass a node you built yourself:

```ts
import { createLucideIcon } from 'lucide-lit';
import { coconut } from '@lucide/lab';

const Coconut = createLucideIcon('coconut', coconut);
void Coconut;
```

Alternatively, subclass `Icon`, set `iconNode` and `name` in the constructor, and call `customElements.define` with your own tag name.

Importing the `icons` map loads every icon module (large bundle); prefer direct named imports per icon when possible.

`createLucideIcon` registers `lucide-${kebabName}` the first time it runs for that name (for example `lucide-coconut`).

## Accessibility

By default, decorative icons set `aria-hidden="true"` on the SVG unless you provide an `aria-label`, `title`, `role`, slotted content, or another accessibility-related attribute.

```html
<lucide-check aria-label="Completed"></lucide-check>
```

See the [accessibility guide](../accessibility.md) for general guidance.
