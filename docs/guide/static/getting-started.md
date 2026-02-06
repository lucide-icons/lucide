<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactSidebar } from '../../.vitepress/sidebar/react'
</script>

# Getting started

This guide will help you get started with Lucide Static in your project.
Make sure you have a your environment set up. If you don't have one yet, you can create a new project using Vite, Parcel or any other boilerplate of your choice.

## For what use cases is `lucide-static` suitable?

`lucide-static` is suitable for _very specific use cases_ where you want to use Lucide icons without relying on a JavaScript framework or component system. It's ideal for:

- Projects that use icon fonts with plain CSS or utility-first frameworks
- Embedding raw SVG files or sprites directly in HTML
- Using SVGs as CSS background images
- Importing SVG strings into Node.js environments

::: danger
### Not recommended for production {#production-warning}

SVG sprites and icon fonts include **all icons**, which can significantly increase your app's bundle size and load time.

For production environments, we recommend using a bundler with tree-shaking support to include only the icons you actually use. Consider using one of the framework-specific [packages](../../packages).
:::

## Installation

### Package Managers

::: code-group

```sh [pnpm]
pnpm add lucide-static
```

```sh [yarn]
yarn add lucide-static
```

```sh [npm]
npm install lucide-static
```

```sh [bun]
bun add lucide-static
```

:::
