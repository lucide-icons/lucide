---
title: Lucide for Hono
description: Learn how to use Lucide icons in your Hono applications with Hono JSX.
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { honoSidebar } from '../../.vitepress/sidebar/hono'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-hono.svg -->

# Lucide for Hono

Lucide provides an icon component library for [Hono JSX](https://hono.dev/docs/guides/jsx).
Each icon is a Hono JSX component that renders an inline SVG element, so icons are part of the HTML your Hono app sends, on any runtime Hono supports.

List of features:

- **Easy to Use**: Import icons as Hono JSX components and use them directly in `c.html()` or any Hono JSX component.
- **Customizable**: Adjust size, color, and other properties via props.
- **Tree-shakable**: Only the icons you use are included in your final bundle.
- **TypeScript Support**: Fully typed components for better developer experience.

## Overview

<OverviewLinkGrid>
  <OverviewLink v-for="item in honoSidebar[0].items.slice(1)" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in honoSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in honoSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

### Resources
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in honoSidebar[3].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
