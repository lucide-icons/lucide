---
title: Lucide for Astro
description: Learn how to use Lucide icons in your Astro applications with our comprehensive guide.
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { astroSidebar } from '../../.vitepress/sidebar/astro'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-astro.svg -->

# Lucide for Astro

Astro components for Lucide icons that work perfectly with Astro's island architecture and multi-framework support. Each icon is an Astro component that renders as an inline SVG, providing excellent performance for static sites and server-side rendering scenarios.

List of features:
- **Easy to Use**: Import icons as Astro components and use them directly in your Astro application.
- **Customizable**: Adjust size, color, and other properties via props.
- **Tree-shakable**: Integrate seamlessly with Astro's component islands and partial hydration
- **TypeScript Support**: Fully typed components for better developer experience.

## Overview

<OverviewLink href="/guide/astro/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your Astro project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in astroSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in astroSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
