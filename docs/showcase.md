---
layout: page
outline: 2
outlineTitle: Showcase
---
<script setup>
import PageContainer from '.vitepress/theme/components/PageContainer.vue'
import PackageList from '.vitepress/theme/components/showcase/ShowcaseList.vue'
</script>

<div class="VPDoc content">
  <PageContainer>
    <PackageList />
  </PageContainer>
</div>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
