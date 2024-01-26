---
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
head:
  - - link
    - rel: canonical
      content: https://lucide.dev/icons/
---

<script setup>
import { data } from './icons.data.ts'
import IconsOverview from '../.vitepress/theme/components/icons/IconsOverview.vue'
import PageContainer from '../.vitepress/theme/components/PageContainer.vue'
</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsOverview :icons="data.icons" />
  </PageContainer>
</div>
