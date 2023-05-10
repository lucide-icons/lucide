<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import type { IconEntity } from '../../types'
import { useMediaQuery, useOffsetPagination } from '@vueuse/core'
import IconDetailOverlay from './IconDetailOverlay.vue'
import IconGrid from './IconGrid.vue'
import InputSearch from '../base/InputSearch.vue'
import useSearch from '../../composables/useSearch'
import EndOfPage from '../base/EndOfPage.vue'
import useSearchInput from '../../composables/useSearchInput'
import StickyBar from './StickyBar.vue'

const props = defineProps<{
  icons: IconEntity[]
}>()

const activeIconName = ref('')

const isExtraLargeScreen = useMediaQuery('(min-width: 1440px)');
const isLargeScreen = useMediaQuery('(min-width: 1280px)');
const isMediumScreen = useMediaQuery('(min-width: 960px)');
const isSmallScreen = useMediaQuery('(min-width: 640px)');

const pageSize = computed(() => {
  if(isExtraLargeScreen.value) {
    return 16 * 16;
  }
  if(isLargeScreen.value) {
    return 16 * 12;
  }
  if(isMediumScreen.value) {
    return 13 * 12;
  }

  if(isSmallScreen.value) {
    return 10 * 10;
  }

  return 10 * 5;
})

const { searchInput, searchQuery, searchQueryThrottled } = useSearchInput()
const searchResults = useSearch(searchQueryThrottled, props.icons, [
  { name: 'name', weight: 3 },
  { name: 'tags', weight: 2 },
  { name: 'categories', weight: 1 },
])

const { next, currentPage } = useOffsetPagination( { pageSize })


const paginatedIcons = computed(() => {
  const end = pageSize.value * currentPage.value

  return searchResults.value.slice(0, end)
})

function setActiveIconName(name: string) {
  activeIconName.value = name
}

const activeIcon = computed(() =>
  props.icons.find((icon) => icon.name === activeIconName.value)
)

watch(searchQueryThrottled, (searchString) => {
  currentPage.value = 1
})

const NoResults = defineAsyncComponent(() =>
  import('./NoResults.vue')
)
</script>

<template>
  <StickyBar>
    <InputSearch
      :placeholder="`Search ${icons.length} icons ...`"
      v-model="searchQuery"
      ref="searchInput"
      class="input-wrapper"
    />
  </StickyBar>
  <NoResults
    v-if="paginatedIcons.length === 0"
    :searchQuery="searchQuery"
    @clear="searchQuery = ''"
  />
  <IconGrid
    overlayMode
    :activeIcon="activeIconName"
    :icons="paginatedIcons"
    @setActiveIcon="setActiveIconName"
  />
  <EndOfPage @end-of-page="next" class="bottom-page"/>
  <IconDetailOverlay :icon="activeIcon" @close="setActiveIconName('')"/>
</template>

<style>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
}

.input-wrapper {
  width: 100%;
}

.bottom-page {
  height: 288px;
}
</style>
