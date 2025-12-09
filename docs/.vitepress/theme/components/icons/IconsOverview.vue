<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue';
import type { IconEntity } from '../../types';
import { useElementSize, useEventListener, useVirtualList } from '@vueuse/core';
import { useRoute } from 'vitepress';
import IconGrid from './IconGrid.vue';
import InputSearch from '../base/InputSearch.vue';
import useSearch from '../../composables/useSearch';
import useSearchInput from '../../composables/useSearchInput';
import useSearchShortcut from '../../utils/useSearchShortcut';
import StickyBar from './StickyBar.vue';
import useFetchTags from '../../composables/useFetchTags';
import useFetchCategories from '../../composables/useFetchCategories';
import chunkArray from '../../utils/chunkArray';
import CarbonAdOverlay from './CarbonAdOverlay.vue';
import useSearchPlaceholder from '../../utils/useSearchPlaceholder.ts';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;

const initialGridItems = computed(() => {
  if (containerWidth.value === 0) return 120;

  const itemsPerRow = columnSize.value || 10;
  const visibleRows = Math.ceil(window.innerHeight / (ICON_SIZE + ICON_GRID_GAP));

  return Math.min(itemsPerRow * (visibleRows + 2), 200);
});

const props = defineProps<{
  icons: IconEntity[];
}>();

const activeIconName = ref(null);

const { execute: fetchTags, data: tags } = useFetchTags();
const { execute: fetchCategories, data: categories } = useFetchCategories();

const overviewEl = ref<HTMLElement | null>(null);
const { width: containerWidth } = useElementSize(overviewEl);

const columnSize = computed(() => {
  return Math.floor(containerWidth.value / (ICON_SIZE + ICON_GRID_GAP));
});

const mappedIcons = computed(() => {
  if (tags.value == null) {
    return props.icons;
  }

  return props.icons.map((icon) => {
    const iconTags = tags.value[icon.name];
    const iconCategories = categories.value?.[icon.name] ?? [];

    return {
      ...icon,
      tags: iconTags,
      categories: iconCategories,
    };
  });
});

const { searchInput, searchQuery, searchQueryDebounced } = useSearchInput();

const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  searchInput.value?.focus();
});

const searchResults = useSearch(searchQueryDebounced, mappedIcons, [
  { name: 'name', weight: 3 },
  { name: 'aliases', weight: 3 },
  { name: 'tags', weight: 2 },
  { name: 'categories', weight: 1 },
]);
const searchPlaceholder = useSearchPlaceholder(searchQuery, searchResults);

const chunkedIcons = computed(() => {
  return chunkArray(searchResults.value, columnSize.value);
});

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(chunkedIcons, {
  itemHeight: ICON_SIZE + ICON_GRID_GAP,
  overscan: 10,
});

onMounted(() => {
  containerProps.ref.value = document.documentElement;
  useEventListener(window, 'scroll', containerProps.onScroll);

  // Check if we should focus the search input from URL parameter
  const route = useRoute();
  if (route.data?.relativePath && window.location.search.includes('focus')) {
    searchInput.value?.focus();
  }
});

function setActiveIconName(name: string) {
  activeIconName.value = name;
}

function onFocusSearchInput() {
  if (tags.value == null) {
    fetchTags();
  }
  if (categories.value == null) {
    fetchCategories();
  }
}

const NoResults = defineAsyncComponent(() => import('./NoResults.vue'));

const IconDetailOverlay = defineAsyncComponent(() => import('./IconDetailOverlay.vue'));

watch(searchQueryDebounced, () => {
  scrollTo(0);
});

function handleCloseDrawer() {
  setActiveIconName('');

  window.history.pushState({}, '', '/icons/');
}
</script>

<template>
  <div
    ref="overviewEl"
    class="overview-container"
  >
    <StickyBar>
      <InputSearch
        :placeholder="`Search ${icons.length} icons ...`"
        v-model="searchQuery"
        ref="searchInput"
        :shortcut="kbdSearchShortcut"
        class="input-wrapper"
        @focus="onFocusSearchInput"
      />
    </StickyBar>
    <NoResults
      v-if="searchPlaceholder.isNoResults"
      :searchQuery="searchPlaceholder.query"
      :isBrandSearch="searchPlaceholder.isBrand"
      @clear="searchQuery = ''"
    />
    <IconGrid
      v-else-if="list.length === 0"
      overlayMode
      :icons="searchResults.slice(0, initialGridItems)"
      :activeIcon="activeIconName"
      @setActiveIcon="setActiveIconName"
    />
    <div
      v-bind="wrapperProps"
      class="icon"
      v-else
    >
      <IconGrid
        v-for="{ index, data: icons } in list"
        :key="index"
        overlayMode
        :icons="icons"
        :activeIcon="activeIconName"
        @setActiveIcon="setActiveIconName"
      />
    </div>
  </div>

  <IconDetailOverlay
    :iconName="activeIconName"
    @close="handleCloseDrawer"
  />

  <CarbonAdOverlay :drawerOpen="!!activeIconName" />
</template>

<style>
.icons {
  margin-bottom: 8px;
}

.icon {
  aspect-ratio: 1/1;
}

.input-wrapper {
  width: 100%;
}
</style>
