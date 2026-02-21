---
title: Lucide for Angular
description: A standalone, signal-based, zoneless implementation that makes it easy to integrate icons into your Angular projects.
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { angularSidebar } from '../../.vitepress/sidebar/angular'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-angular.svg -->

# Lucide for Angular

A standalone, signal-based, zoneless implementation that makes it easy to integrate icons into your Angular projects.

List of features:
- **Easy to Use**: Use icons as standalone Angular components with full dependency injection support.
- **Customizable**: Adjust size, color, and other properties via props or globally with angular provider.
- **Tree-shakable**: Only the icons you use are included in your final bundle
- **TypeScript Support**: Fully typed components for better developer experience.

## Overview

<OverviewLink href="/guide/angular/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your Angular project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in angularSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in angularSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
