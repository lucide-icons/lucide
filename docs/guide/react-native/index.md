---
title: Overview
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactNativeSidebar } from '../../.vitepress/sidebar/react-native'
</script>

<img src="/package-logos/dark/lucide-react-native.svg" alt="Lucide icon library for React Native applications." width="540" style="margin-bottom: 48px;"/>

<!-- [![npm](https://img.shields.io/npm/v/lucide-native-react?color=blue)](https://www.npmjs.com/package/lucide-native-react)
[![NPM Downloads](https://img.shields.io/npm/dw/lucide-native-react)](https://www.npmjs.com/package/lucide-native-react) -->

# Lucide for React Native

Lucide provides a React Native icon component library that makes it easy to integrate icons into your React Native applications.
Each icon is available as a standalone React component, allowing for seamless integration and customization.

List of features:
- **Easy to Use**: Import icons as React components and use them directly in your React components with JSX.
- **Customizable**: Adjust size, color, and other properties via props.
- **Tree-shakable**: Only the icons you use are included in your final bundle
- **TypeScript Support**: Fully typed components for better developer experience.

React components for Lucide icons that integrate seamlessly into your React Native applications. Each icon is a fully-typed React component that renders as an optimized inline SVG, giving you the flexibility of components with the performance of vector graphics.

## Overview

<OverviewLink
  href="/guide/react-native/getting-started"
  title="Getting Started"
  desc="Learn how to get started with Lucide in your React Native project."
/>

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
</OverviewLinkGrid >

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
</OverviewLinkGrid >

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
</OverviewLinkGrid >
