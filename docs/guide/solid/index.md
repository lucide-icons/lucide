---
title: Overview
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { solidSidebar } from '../../.vitepress/sidebar/solid'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-solid.svg -->


# Lucide for Solid

Lucide provides a Solid icon component library that makes it easy to integrate icons into your Solid applications.
Each icon is available as a standalone Solid component, allowing for seamless integration and customization.

List of features:
- **Easy to Use**: Import icons as Solid components and use them directly in your Solid components with JSX.
- **Customizable**: Adjust size, color, and other properties via props.
- **Tree-shakable**: Only the icons you use are included in your final bundle
- **TypeScript Support**: Fully typed components for better developer experience.

## Overview

<OverviewLink href="/guide/solid/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your Solid project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in solidSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in solidSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Resources
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in solidSidebar[3].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
