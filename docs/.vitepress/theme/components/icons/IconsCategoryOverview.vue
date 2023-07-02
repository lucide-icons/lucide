<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import type { IconEntity, Category } from '../../types'
import useSearch from '../../composables/useSearch'
import InputSearch from '../base/InputSearch.vue'
import useSearchInput from '../../composables/useSearchInput'
import StickyBar from './StickyBar.vue'
import IconsCategory from './IconsCategory.vue'
import { useFetch } from '@vueuse/core'
import useFetchTags from '../../composables/useFetchTags'
import useFetchCategories from '../../composables/useFetchCategories'

const props = defineProps<{
  icons: IconEntity[]
  categories: Category[]
  iconCategories: Record<string, string[]>
}>()

const activeIconName = ref(null)
const { searchInput, searchQuery, searchQueryThrottled } = useSearchInput()

const isSearching = computed(() => !!searchQuery.value)

function setActiveIconName(name: string) {
  activeIconName.value = name
}

const { execute: fetchTags, data: tags } = useFetchTags()
const { execute: fetchCategories, data: categoriesMap } = useFetchCategories()

const mappedIcons = computed(() => {
  if(tags.value == null) {
    return props.icons
  }
  return props.icons.map((icon) => {
    const iconTags = tags.value[icon.name]
    const iconCategories = categoriesMap.value?.[icon.name] ?? []

    return {
      ...icon,
      tags: iconTags,
      categories: iconCategories,
    }
  })
})

const searchResults = useSearch(searchQuery, mappedIcons, [
  { name: 'name', weight: 2 },
  { name: 'tags', weight: 1 },
])

const categories = computed(() => {
  if( !props.categories?.length || !props.icons?.length ) return []

  return props.categories.map(({ name, title }) => {
    const categoryIcons = props.icons.filter((icon) => {
      const iconCategories = props.iconCategories[icon.name]

      return iconCategories?.includes(name)
    })

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

function onFocusSearchInput() {
  if (tags.value == null) {
    fetchTags()
  }
  if (categoriesMap.value == null) {
    fetchCategories()
  }
}

const NoResults = defineAsyncComponent(() =>
  import('./NoResults.vue')
)

const IconDetailOverlay = defineAsyncComponent(() =>
  import('./IconDetailOverlay.vue')
)
</script>

<template>
  <StickyBar class="search-bar category-search">
    <InputSearch
      :placeholder="`Search ${icons.length} icons ...`"
      v-model="searchQuery"
      class="input-wrapper"
      ref="searchInput"
      @focus="onFocusSearchInput"
    />
  </StickyBar>
  <NoResults
    v-if="categories.length === 0"
    :searchQuery="searchQuery"
    @clear="searchQuery = ''"
  />
  <IconsCategory
    v-for="category in categories"
    :key="category.name"
    :category="category"
    :activeIconName="activeIconName"
    @setActiveIcon="setActiveIconName"
  />
  <IconDetailOverlay
    v-if="activeIconName != null"
    :iconName="activeIconName"
    @close="setActiveIconName('')"
  />
</template>

<style scoped>
.input-wrapper {
  width: 100%;
}

.search-bar.category-search {
  margin-bottom: -54px;
}
</style>
