---
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
---

<script setup>
import { data } from './index.data.ts'
import IconsOverview from '../.vitepress/theme/components/icons/IconsOverview.vue'
import PageContainer from '../.vitepress/theme/components/PageContainer.vue'

const { categories, icons } = data
</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsOverview :icons="icons" />
  </PageContainer>
</div>
