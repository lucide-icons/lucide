---
title: Overview
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { lucideSidebar } from '../../.vitepress/sidebar/lucide'
</script>

<!--@include: ../../../docs/images/package-logos/lucide.svg -->

# Lucide Static Assets

Static assets and utilities for Lucide icons that work without JavaScript frameworks. This package provides multiple formats including individual SVG files, SVG sprites, icon fonts, and Node.js utilities for server-side rendering and static site generation.

**What you can accomplish:**

- Use individual SVG files as images or CSS background images
- Implement icon fonts for CSS-based icon systems
- Create SVG sprites for efficient icon loading in static sites
- Import SVG strings in Node.js applications and server-side rendering
- Build static websites and applications without JavaScript framework dependencies

This package includes the following implementations of Lucide icons:

- Individual SVG files
- SVG sprite
- Icon font files
- A JavaScript library exporting SVG strings

## Overview

<OverviewLink href="/guide/static/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in lucideSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in lucideSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Resources
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in lucideSidebar[3].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
