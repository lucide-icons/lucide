---
title: Lucide for React Native
description: Lucide provides a React Native icon component library that makes it easy to integrate icons into your React Native applications. Each icon is available as a standalone React Native component, allowing for seamless integration and customization.
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactNativeSidebar } from '../../.vitepress/sidebar/react-native'
</script>

<!--@include: ../../../docs/images/package-logos/lucide-react-native.svg -->

# Lucide for React Native

Lucide provides a React Native icon component library that makes it easy to integrate icons into your React Native applications.
Each icon is available as a standalone React component, allowing for seamless integration and customization.

List of features:

- **Easy to use** – Import icons and use them directly in JSX.
- **Customizable** – Adjust size, color, stroke width, and other properties via props.
- **Tree-shakable** – Only the icons you import are included in your final bundle.
- **TypeScript support** – Fully typed components for a better developer experience.

## Overview

<OverviewLinkGrid>
  <OverviewLink v-for="item in reactNativeSidebar[0].items.slice(1)" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink
    v-for="item in reactNativeSidebar[1].items"
    :key="item.link"
    :href="item.link"
    :title="item.text"
    :desc="item.desc"
  />
</OverviewLinkGrid>

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink
    v-for="item in reactNativeSidebar[2].items"
    :key="item.link"
    :href="item.link"
    :title="item.text"
    :desc="item.desc"
  />
</OverviewLinkGrid>

### Resources
{{''}}

<OverviewLinkGrid>
  <OverviewLink
    v-for="item in reactNativeSidebar[3].items"
    :key="item.link"
    :href="item.link"
    :title="item.text"
    :desc="item.desc"
  />
</OverviewLinkGrid>
