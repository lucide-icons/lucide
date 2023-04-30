---
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
---

<script setup>
import { data } from './index.data.ts'
import IconsOverview from '../.vitepress/components/IconsOverview.vue'
import PageContainer from '../.vitepress/components/PageContainer.vue'

const { categories, icons } = data
</script>

<PageContainer>
  <IconsOverview :icons="icons" />
</PageContainer>
