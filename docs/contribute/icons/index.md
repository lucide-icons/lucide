---
description: Guidelines and instructions for contributing icons to Lucide
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue';
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue';
import { resourcesSidebar } from '../../.vitepress/sidebar/resources.ts';
</script>

# Designing icons for Lucide

Every icon should feel like it belongs with the rest of Lucide.

This guide explains how to design and prepare icons for Lucide.

## What this guide covers

<OverviewLinkGrid>
  <OverviewLink v-for="item in resourcesSidebar[2].items.slice(1, -1)" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

## Use your preferred design tool

You can design Lucide icons with any vector editor that can export SVG.

Use these step-by-step guides for common tools:

<OverviewLinkGrid>
  <OverviewLink v-for="item in resourcesSidebar[2].items.at(-1).items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

These guides explain how to set up your document, follow the Lucide rules, and export a usable SVG.

Regardless of which tool you use, the same design and SVG requirements apply.
