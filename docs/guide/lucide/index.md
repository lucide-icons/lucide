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

# Lucide for Vanilla JavaScript

The core Lucide package for vanilla JavaScript applications. This package allows you to easily add scalable vector icons to any web project without framework dependencies. Perfect for static websites, legacy applications, or when you need lightweight icon integration with maximum browser compatibility.

**What you can accomplish:**

- Add icons to HTML using simple data attributes
- Dynamically create and insert SVG icons with JavaScript
- Customize icon appearance with CSS classes and inline styles
- Tree-shake unused icons to keep bundle sizes minimal
- Use icons in Vanilla JS with HTML

Lucide is designed to be lightweight and easy to use, making it an excellent choice for projects that require icons without the overhead of a full framework integration.

## Overview

<OverviewLink href="/guide/react/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your JS project."/>

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
