---
title: Lucide for Lit
description: Lucide provides a Lit-based icon package using standard web components. Each icon registers a custom element so you can use it in HTML or in Lit templates.
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { litSidebar } from '../../.vitepress/sidebar/lit'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-lit.svg -->


# Lucide for Lit

Lucide provides a Lit-based package for web applications. Each icon is a `LitElement` subclass registered as a custom element (for example `lucide-camera`), rendering an inline SVG inside the shadow root.

List of features:

- **Web standards**: Icons are custom elements that work in any HTML page or Lit app.
- **Customizable**: Adjust `size`, `color`, `strokeWidth`, and `absoluteStrokeWidth` via properties or attributes.
- **Tree-shakable**: Import only the icons you use from the main entry.
- **TypeScript**: Types for icons and the `Icon` helper are included.

## Overview

### Getting started
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in litSidebar[0].items.slice(1)" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

### Reference
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in litSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>
