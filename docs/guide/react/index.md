---
title: Overview
nextPage:
  - getting-started
---

<script setup>
import OverviewLink from '../../.vitepress/theme/components/base/OverviewLink.vue'
import OverviewLinkGrid from '../../.vitepress/theme/components/base/OverviewLinkGrid.vue'
import { reactSidebar } from '../../.vitepress/sidebar/react'
</script>

<img src="/package-logos/dark/lucide-react.svg" alt="Lucide icon library for React applications." width="540" style="margin-bottom: 48px;"/>

<!-- [![npm](https://img.shields.io/npm/v/lucide-react?color=blue)](https://www.npmjs.com/package/lucide-react)
[![NPM Downloads](https://img.shields.io/npm/dw/lucide-react)](https://www.npmjs.com/package/lucide-react) -->


# Lucide for React

Lucide provides a React icon component library that makes it easy to integrate icons into your React applications.
Each icon is available as a standalone React component, allowing for seamless integration and customization.

List of features:
- **Easy to Use**: Import icons as React components and use them directly in your React components with JSX.
- **Customizable**: Adjust size, color, and other properties via props.
- **Tree-shakable**: Only the icons you use are included in your final bundle
- **TypeScript Support**: Fully typed components for better developer experience.

React components for Lucide icons that integrate seamlessly into your React applications. Each icon is a fully-typed React component that renders as an optimized inline SVG, giving you the flexibility of components with the performance of vector graphics.

## Overview

<OverviewLink href="/guide/react/getting-started" title="Getting Started" desc="Learn how to get started with Lucide in your React project."/>

### Basics
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in reactSidebar[1].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Advanced
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in reactSidebar[2].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >

### Resources
{{''}}

<OverviewLinkGrid>
  <OverviewLink v-for="item in reactSidebar[3].items" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid >
