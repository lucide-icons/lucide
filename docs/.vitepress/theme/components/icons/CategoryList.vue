<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData } from 'vitepress'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
import { isActive } from 'vitepress/dist/client/shared'
import { useActiveAnchor } from '../../composables/useActiveAnchor'
import { data } from './CategoryList.data'
import CategoryListItem from './CategoryListItem.vue'
import SidebarTitle from './SidebarTitle.vue'
import { useCategoryView } from '../../composables/useCategoryView'

const { page } = useData()
const { categoryCounts } = useCategoryView();

const categoriesIsActive = computed(() => {
  return isActive(page.value.relativePath, '/icons/categories');
});

const overviewIsActive = computed(() => {
  return isActive(page.value.relativePath, '/icons/');
});

const headers = computed(() => {
  const linkPrefix = page.value.relativePath.startsWith('icons/categories')
    ? '' : '/icons/categories'

  return data.categories.map(({ name, title, iconCount }) => ({
    level: 2,
    link: `${linkPrefix}#${name}`,
    title,
    iconCount: categoryCounts.value[name] ?? iconCount,
    name
  }))
})

const container = ref()
const marker = ref()

const { setActiveLinkDebounced } = useActiveAnchor(container, marker)

watch(headers, () => {
  setTimeout(() => {
    setActiveLinkDebounced()
  }, 200)
})
</script>

<template>
  <div class="category-list" ref="container">
    <SidebarTitle>
      View
    </SidebarTitle>
    <VPLink class="sidebar-link sidebar-text" href="/icons/" :class="{ 'active': overviewIsActive } ">
      All
    </VPLink>
    <VPLink class="sidebar-link sidebar-text" href="/icons/categories" :class="{ 'active': categoriesIsActive } ">
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
.sidebar-text {
  line-height: 24px;
  font-size: 14px;
  display: block;
  transition: color 0.25s;
  padding: 4px 0;
}

.sidebar-link {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.sidebar-link:hover, .sidebar-link.active {
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
