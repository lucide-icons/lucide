---
title: How to use Lucide icons
description: Learn how to use icons in an accessible, user-friendly way
---

<script setup>
import OverviewLink from '../.vitepress/theme/components/base/OverviewLink.vue';
import OverviewLinkGrid from '../.vitepress/theme/components/base/OverviewLinkGrid.vue';
import { resourcesSidebar } from '../.vitepress/sidebar/resources.ts';
</script>

# How to use Lucide icons

Icons can make an interface easier to scan, but they only help when their meaning is clear. These guides explain how to choose icons that support the interface, when to pair icons with text, and when the best icon to use is no icon at all.

Use the accessibility guide to make icons readable, understandable, and usable with assistive technology. Use the icon guide to decide when icons belong in an interface and how to pick symbols people are likely to recognize.

## What this guide covers

<OverviewLinkGrid>
  <OverviewLink v-for="item in resourcesSidebar[2].items.slice(1)" :key="item.link" :href="item.link" :title="item.text" :desc="item.desc"/>
</OverviewLinkGrid>

## Further resources

- [The no-bullshit guide to icon design and usage](https://erik-engheim.medium.com/the-no-bullshit-guide-to-icon-design-and-usage-40948878dbbb) by Erik Engheim
- [On icons](https://ia.net/topics/on-icons/) by iA
- [How to use icons in UI and UX design](https://blog.thenounproject.com/how-to-use-icons-in-ui-and-ux-design-best-practices/) by The Noun Project
- [UX Myth: Icons enhance usability](https://uxmyths.com/post/715009009/myth-icons-enhance-usability) by UX Myths
