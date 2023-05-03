---
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
---

<script setup>
import { data } from './index.data.ts'
import PageContainer from '../.vitepress/theme/components/PageContainer.vue'
import IconsCategoryOverview from '../.vitepress/theme/components/icons/IconsCategoryOverview.vue'

</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsCategoryOverview
      :categories="data.categories"
      :icons="data.icons"
    />
  </PageContainer>
</div>
