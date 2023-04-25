---
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
---

<script setup>
import { data } from './index.data.ts'
import PageContainer from '../.vitepress/components/PageContainer.vue'
import IconsCategoryOverview from '../.vitepress/components/IconsCategoryOverview.vue'

</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsCategoryOverview
      :categories="data.categories"
      :icons="data.icons"
    />
  </PageContainer>
</div>
