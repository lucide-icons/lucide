---
title: Overview
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { preactSidebar } from '../../.vitepress/sidebar/preact'
</script>

<img src="/package-logos/dark/lucide-preact.svg" alt="Lucide icon library for Preact applications." width="540" style="margin-bottom: 48px;"/>

<!-- [![npm](https://img.shields.io/npm/v/lucide-preact?color=blue)](https://www.npmjs.com/package/lucide-preact)
[![NPM Downloads](https://img.shields.io/npm/dw/lucide-preact)](https://www.npmjs.com/package/lucide-preact) -->


# Lucide for Preact

Lucide provides a Preact icon component library that makes it easy to integrate icons into your Preact applications.
Each icon is available as a standalone Preact component, allowing for seamless integration and customization.

List of features:
- **Easy to Use**: Import icons as Preact components and use them directly in your Preact components with JSX.
- **Customizable**: Adjust size, color, and other properties via props.
- **Tree-shakable**: Only the icons you use are included in your final bundle
- **TypeScript Support**: Fully typed components for better developer experience.

## Overview

<OverviewLink href="/guide/preact/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your Preact project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in preactSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in preactSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Resources
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in preactSidebar[3].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
