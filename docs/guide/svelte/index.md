---
title: Lucide for Svelte
description: Lucide provides a Svelte icon component library that makes it easy to integrate icons into your Svelte applications. Each icon is available as a standalone Svelte component, allowing for seamless integration and customization.
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { svelteSidebar } from '../../.vitepress/sidebar/svelte'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-svelte.svg -->

# Lucide for Svelte

Lucide provides a Svelte icon component library that makes it easy to integrate icons into your Svelte applications.
Each icon is available as a standalone Svelte component, allowing for seamless integration and customization.

List of features:
- **Easy to Use**: Import icons as Svelte components and use them directly in your Svelte components with JSX.
- **Customizable**: Adjust size, color, and other properties via props and global context.
- **Tree-shakable**: Only the icons you use are included in your final bundle
- **TypeScript Support**: Fully typed components for better developer experience.

## Overview

<OverviewLink href="/guide/svelte/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your Svelte project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in svelteSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in svelteSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
