---
title: Getting started - Lit
description: Install lucide-lit and use Lucide icons as Lit custom elements.
---

# Getting started

This guide helps you add Lucide to a Lit project. You can use Vite, Open Web Components, or any setup that supports `lit` and ES modules.

## Installation

::: code-group

```sh [pnpm]
pnpm add lucide-lit lit
```

```sh [yarn]
yarn add lucide-lit lit
```

```sh [npm]
npm install lucide-lit lit
```

```sh [bun]
bun add lucide-lit lit
```

:::

`lucide-lit` lists `lit` as a peer dependency; keep your `lit` version on the latest 3.x release your app supports.

## Importing an icon

Importing a module runs `customElements.define` for that icon’s tag (for example `lucide-camera`). Use the tag in HTML or in a Lit `html` template.

```html
<script type="module">
  import { Camera } from 'lucide-lit';
  void Camera;
</script>

<lucide-camera size="32" color="currentColor"></lucide-camera>
```

```js
import { html, LitElement } from 'lit';
import { Camera } from 'lucide-lit';

void Camera;

class DemoApp extends LitElement {
  render() {
    return html`
      <lucide-camera size="48" color="red"></lucide-camera>
    `;
  }
}

customElements.define('demo-app', DemoApp);
```

## Custom tag names

Each icon is registered under `lucide-` plus the icon’s kebab-case name (for example `arrow-right` → `<lucide-arrow-right>`). Registering the same tag twice is skipped internally.

## Next steps

See the [package reference](../packages/lucide-lit.md) for props, the generic `Icon` component, and `createLucideIcon` for Lucide Lab or custom icons.
