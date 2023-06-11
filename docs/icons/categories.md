---
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
---

<script setup>
import { data } from './icons.data.ts'
import { data as categoriesData } from './categories.data.ts'
import PageContainer from '../.vitepress/theme/components/PageContainer.vue'
import IconsCategoryOverview from '../.vitepress/theme/components/icons/IconsCategoryOverview.vue'

</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsCategoryOverview
      :categories="categoriesData.categories"
      :icons="data.icons"
      :iconCategories="categoriesData.iconCategories"
    />
  </PageContainer>
</div>
