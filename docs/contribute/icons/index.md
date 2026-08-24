---
title: Contributing Icons
description: Guidelines and instructions for contributing icons to Lucide.
---
<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { resourcesSidebar } from '../../.vitepress/sidebar/resources.ts'
</script>

# Designing icons for Lucide

Within any icon set, every icon should feel like it belongs alongside the rest of the library.

This guide explains how to design and prepare icons for contribution to Lucide.

## What's in this guide?

<OverviewLinkGrid>
  <OverviewLink v-for="item in resourcesSidebar[2].items.slice(1, -1)" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

## Designing icons with your preferred software

You do not need to use any particular design software, you can design Lucide icons with any vector graphics editor that can export SVG.

We provide step-by-step guides for the following common tools:

<OverviewLinkGrid>
  <OverviewLink v-for="item in resourcesSidebar[2].items.at(-1).items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

These guides explain how to set up your document, work within the Lucide design constraints, and export an SVG suitable for contribution.

Regardless of which tool you use, the same design and SVG requirements apply.
