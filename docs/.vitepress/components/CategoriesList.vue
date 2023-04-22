<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'
import VPDocOutlineItem from 'vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue'
import { onContentUpdated } from 'vitepress'
import { useActiveAnchor } from '../composables/useActiveAnchor'
import { data } from './CategoriesList.data'

const { frontmatter, theme, params, page } = useData()

interface Header {
  level: number
  title: string
  slug: string
  link: string
  children: Header[]
}
type MenuItem = Omit<Header, 'slug' | 'children'> & {
  children?: MenuItem[]
}

// const headers = shallowRef<MenuItem[]>([])

// onContentUpdated(() => {
//   headers.value = data.categories.map(({ name, title }) => ({
//     level: 2,
//     link: `#${name}`,
//     title,
//   }))
// })

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
    <h2 class="sidebar-title">
      Categories
    </h2>
    <div class="content">
      <div class="outline-marker" ref="marker" />
      <nav aria-labelledby="doc-outline-aria-label">
        <VPDocOutlineItem :headers="headers" :root="true" />
      </nav>
    </div>
  </div>
</template>

<style scoped>
.category-list {
  margin-top: -16px;
}
.sidebar-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  line-height: 24px;
  font-size: 14px;
}
.content {
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
