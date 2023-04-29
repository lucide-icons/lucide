<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import type { IconEntity } from '../types'
import { useMediaQuery, useOffsetPagination } from '@vueuse/core'
import IconItem from './IconItem.vue'
import IconDetailOverlay from './IconDetailOverlay.vue'
import IconGrid from './IconGrid.vue'
import Input from './Input.vue'
import useSearch from '../composables/useSearch'
import EndOfPage from './EndOfPage.vue'

const props = defineProps<{
  icons: IconEntity[]
}>()

const activeIconName = ref('')
const searchQuery = ref(
  typeof window === 'undefined'
    ? ''
    : (
      new URLSearchParams(window.location.search).get('search')
      || ''
    )
)

const isExtraLargeScreen = useMediaQuery('(min-width: 1440px)');
const isLargeScreen = useMediaQuery('(min-width: 1280px)');
const isMediumScreen = useMediaQuery('(min-width: 960px)');
const isSmallScreen = useMediaQuery('(min-width: 640px)');

const searchInput = ref()
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

const searchResults = useSearch(searchQuery, props.icons, [
  { name: 'name', weight: 2 },
  { name: 'tags', weight: 1 },
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

watch(searchQuery, (searchString) => {
  const newUrl = new URL(window.location.href);

  newUrl.searchParams.set('search', searchString);

  nextTick(() => {
    window.history.replaceState({}, '', newUrl)
  })

  currentPage.value = 1
})

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('search')) {
    searchInput.value.focus()
  }
})
</script>

<template>
  <Input type="search" placeholder="Search icons..." v-model="searchQuery" class="input-wrapper" ref="searchInput"/>
  <IconGrid :activeIcon="activeIconName" :icons="paginatedIcons" @setActiveIcon="setActiveIconName"/>
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

.input-wrapper .input {
  padding: 12px 24px;
  font-size: 14px;
  height: 48px;
}

.input-wrapper {
  margin-bottom: 8px;
}

.bottom-page {
  height: 200px;
}
</style>
