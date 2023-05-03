<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { isActive } from 'vitepress/dist/client/theme-default/support/utils'
import { useActiveAnchor } from '../../composables/useActiveAnchor'
import { data } from './CategoryList.data'
import CategoryListItem from './CategoryListItem.vue'

const { page } = useData()

const categoriesIsActive = computed(() => {
  return isActive(page.value.relativePath, '/icons/categories');
});

const overviewIsActive = computed(() => {
  return isActive(page.value.relativePath, '/icons/');
});

const headers = computed(() => {
  const linkPrefix = page.value.relativePath.startsWith('icons/categories')
    ? '' : '/icons/categories'

  return data.categories.map(({ name, title }) => ({
    level: 2,
    link: `${linkPrefix}#${name}`,
    title,
  }))
})

const container = ref()
const marker = ref()

useActiveAnchor(container, marker)
</script>

<template>
  <div class="category-list" ref="container">
    <VPLink class="sidebar-title" href="/icons/" :class="{ 'active': overviewIsActive } ">
      All
    </VPLink>
    <VPLink class="sidebar-title" href="/icons/categories" :class="{ 'active': categoriesIsActive } ">
      Categories
    </VPLink>
    <div class="content">
      <div class="outline-marker" ref="marker" />
      <nav aria-labelledby="doc-outline-aria-label">
        <CategoryListItem  :headers="headers" :root="true" />
      </nav>
    </div>
  </div>
</template>

<style scoped>
.sidebar-title {
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
  line-height: 24px;
  font-size: 14px;
  display: block;
  transition: color 0.25s;
}

.sidebar-title:hover, .sidebar-title.active {
  color: var(--vp-c-brand);
}
.content {
  margin-top: 12px;
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 1px;
  height: 18px;
  background-color: var(--vp-c-brand);
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s;
}

.outline-title {
  letter-spacing: 0.4px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 600;
}
.root {
  z-index: 0;
}
</style>
