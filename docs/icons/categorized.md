---
layout: page
outlineTitle: Categories
---

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { data } from './index.data.ts'
import PageContainer from '../.vitepress/components/PageContainer.vue'
import IconsCategoryOverview from '../.vitepress/components/IconsCategoryOverview.vue'

</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsCategoryOverview :categories="data.categories" :icon="data.icons" />
  </PageContainer>
</div>
