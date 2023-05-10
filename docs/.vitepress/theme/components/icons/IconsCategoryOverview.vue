<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IconEntity, Category } from '../../types'
import IconDetailOverlay from './IconDetailOverlay.vue'
import IconGrid from './IconGrid.vue'
import useSearch from '../../composables/useSearch'
import InputSearch from '../base/InputSearch.vue'
import useSearchInput from '../../composables/useSearchInput'
import StickyBar from './StickyBar.vue'

const props = defineProps<{
  icons: IconEntity[]
  categories: Category[]
}>()

const activeIconName = ref('')
const { searchInput, searchQuery, searchQueryThrottled } = useSearchInput()

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

const activeIcon = computed(() =>
  props.icons?.find((icon) => icon.name === activeIconName.value)
)
</script>

<template>
  <StickyBar>
    <InputSearch
      :placeholder="`Search ${icons.length} icons ...`"
      v-model="searchQuery"
      class="input-wrapper"
      ref="searchInput"
    />
  </StickyBar>
  <section class="category" v-for="category in categories" :key="category.name">
    <h2 class="title" :id="category.name">
      <a class="header-anchor" :href="`#${category.name}`" :aria-label="`Permalink to &quot;${category.title}&quot;`">&ZeroWidthSpace;</a>
      {{ category.title }}
    </h2>
    <IconGrid
      :activeIcon="activeIconName"
      :icons="category.icons"
      @setActiveIcon="setActiveIconName"
      overlayMode
    />
  </section>
  <IconDetailOverlay :icon="activeIcon" @close="setActiveIconName('')"/>
</template>

<style scoped>
.icon {
  aspect-ratio: 1/1;
}

.title {
  margin-bottom: 24px;
  font-size: 19px;
  font-weight: 500;
}

.category {
  margin-bottom: 32px;
}

.input-wrapper {
  width: 100%;
}

/* .input-wrapper {
  margin-bottom: 32px;
} */
</style>
