<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import type { IconEntity, Category } from '../types'
import IconDetailOverlay from './IconDetailOverlay.vue'
import IconGrid from './IconGrid.vue'
import useSearch from '../composables/useSearch'
import Input from './Input.vue'
import EndOfPage from './EndOfPage.vue'
import { useCategoryView } from '../composables/useCategoryView'

const props = defineProps<{
  icons: IconEntity[]
  categories: Category[]
}>()

const { selectedCategory } = useCategoryView()
const activeIconName = ref('')
const searchQuery = ref(
  typeof window === 'undefined'
    ? ''
    : (
      new URLSearchParams(window.location.search).get('search')
      || ''
    )
)

const searchInput = ref()
const isSearching = computed(() => !!searchQuery.value)

function setActiveIconName(name: string) {
  activeIconName.value = name
}

const searchResults = useSearch(searchQuery, props.icons, [
  { name: 'name', weight: 2 },
  { name: 'tags', weight: 1 },
])

const categories = computed(() => {
  if( !props.categories?.length || !props.icons?.length ) return []

  return props.categories.map(({ name, title }) => {
    const categoryIcons = props.icons.filter(
      ({ categories }) => categories.includes(name)
    )

    const searchedCategoryIcons = isSearching
      ? categoryIcons.filter(icon => searchResults.value.some((item) => item?.name === icon?.name))
      : categoryIcons;

    return {
      title,
      name,
      icons: searchedCategoryIcons,
    };
  })
  .filter(({ icons }) => icons.length)
})

watch(searchQuery, (searchString) => {
  const newUrl = new URL(window.location.href);

  newUrl.searchParams.set('search', searchString);

  nextTick(() => {
    window.history.replaceState({}, '', newUrl)
  })
})

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('search')) {
    searchInput.value.focus()
  }
})

const activeIcon = computed(() =>
  props.icons?.find((icon) => icon.name === activeIconName.value)
)
</script>

<template>
  <Input type="search" placeholder="Search icons..." v-model="searchQuery" class="input-wrapper" ref="searchInput"/>
  <section class="category" v-for="category in categories" :key="category.name">
    <h2 class="title" :id="category.name">
      <a class="header-anchor" :href="`#${category.name}`" :aria-label="`Permalink to &quot;${category.title}&quot;`">&ZeroWidthSpace;</a>
      {{ category.title }}
    </h2>
    <IconGrid
      :activeIcon="activeIconName"
      :icons="category.icons"
      @setActiveIcon="setActiveIconName"
    />
  </section>
  <IconDetailOverlay :icon="activeIcon" @close="setActiveIconName('')"/>
</template>

<style scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
}

.title {
  margin-bottom: 24px;
  font-size: 19px;
}

.category {
  margin-bottom: 32px;
}

.input-wrapper:deep(.input) {
  padding: 12px 24px;
  font-size: 14px;
  height: 48px;
}

.input-wrapper {
  margin-bottom: 16px;
}

.hidden-category {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
