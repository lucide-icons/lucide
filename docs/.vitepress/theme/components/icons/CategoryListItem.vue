<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryView } from '../../composables/useCategoryView'

interface Header {
  level: number
  title: string
  slug: string
  iconCount: number
  link: string
  children: Header[]
}

type MenuItem = Omit<Header, 'slug' | 'children'> & {
  children?: MenuItem[]
}

const props = defineProps<{
  headers: MenuItem[]
  root?: boolean
}>()

const { selectedCategory } = useCategoryView()

function onClick(event: Event) {
  const id = '#' + (event.target as HTMLAnchorElement).href!.split('#')[1]
  const decodedId = decodeURIComponent(id)

  selectedCategory.value = decodedId.replace('#', '')

  const heading = document.querySelector<HTMLAnchorElement>(decodedId)
  heading?.focus()
}
</script>

<template>
  <ul :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title, iconCount } in headers">
      <a
        class="outline-link"
        :href="link"
        @click="onClick"
        :title="title"
      >
        <span>
          {{ title }}
        </span>
        <span class="icon-count" :aria-label="`Count of icons in ${title}`">
          {{ iconCount }}
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.root {
  position: relative;
  z-index: 1;
}

.nested {
  padding-left: 13px;
}

.outline-link {
  display: flex;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 500;
}

.outline-link:hover,
.outline-link.active {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.outline-link.nested {
  padding-left: 13px;
}

.icon-count {
  opacity: 0.5;
  margin-left: auto;
}
</style>
