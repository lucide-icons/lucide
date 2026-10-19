<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue';
import type { IconEntity } from '../../types';
import { useElementSize, useEventListener, useVirtualList } from '@vueuse/core';
import { DefaultTheme, useData, useRoute } from 'vitepress';
import IconGrid from './IconGrid.vue';
import Select from '../base/Select.vue';
import InputSearch from '../base/InputSearch.vue';
import useIconSearch from '../../composables/useIconSearch';
import useSearchInput from '../../composables/useSearchInput';
import useSearchShortcut from '../../utils/useSearchShortcut';
import StickyBar from './StickyBar.vue';
import chunkArray from '../../utils/chunkArray';
import CarbonAdOverlay from './CarbonAdOverlay.vue';
import useSearchPlaceholder from '../../utils/useSearchPlaceholder.ts';
import { sortIcons, type SortKey } from '../../utils/sortIcons';
import { prefetchAlgoliaClient } from '../../utils/algolia';
import Icon from '@lucide/vue/src/Icon';
import { listSortDescending } from '~/.vitepress/data/iconNodes';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;
const SORTING: { name: string; value: SortKey }[] = [
  {
    name: 'Popularity',
    value: 'popularity',
  },
  {
    name: 'Release date',
    value: 'release-date',
  },
  {
    name: 'Name',
    value: 'name',
  },
];

const initialGridItems = computed(() => {
  if (containerWidth.value === 0) return 120;

  const itemsPerRow = columnSize.value || 10;
  const visibleRows = Math.ceil(window.innerHeight / (ICON_SIZE + ICON_GRID_GAP));

  return Math.min(itemsPerRow * (visibleRows + 2), 200);
});

const props = defineProps<{
  icons: IconEntity[];
}>();

const { theme } = useData<DefaultTheme.Config>()
  const algoliaSearchOptions = theme.value.search?.options as DefaultTheme.AlgoliaSearchOptions;

const activeIconName = ref(null);
const selectedSort = ref(SORTING[0]);

const overviewEl = ref<HTMLElement | null>(null);
const { width: containerWidth } = useElementSize(overviewEl);

const columnSize = computed(() => {
  return Math.floor(containerWidth.value / (ICON_SIZE + ICON_GRID_GAP));
});

const sortedIcons = computed(() => sortIcons(props.icons, selectedSort.value.value));

const { searchInput, searchQuery, searchQueryDebounced } = useSearchInput();

const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  searchInput.value?.focus();
});

const { results: searchResults, isPending: isSearchPending } = useIconSearch(
  searchQueryDebounced,
  sortedIcons,
  algoliaSearchOptions,
);

// While searching, "Popularity" keeps Algolia's relevance order.
// The other sort options re-sort the matching icons locally.
const displayedIcons = computed(() => {
  if (searchQueryDebounced.value && selectedSort.value.value !== 'popularity') {
    return sortIcons(searchResults.value, selectedSort.value.value);
  }

  return searchResults.value;
});

const searchPlaceholder = useSearchPlaceholder(searchQuery, searchResults);
const isSearchSettling = computed(
  () => searchQuery.value !== searchQueryDebounced.value || isSearchPending.value,
);

const chunkedIcons = computed(() => {
  return chunkArray(displayedIcons.value, columnSize.value);
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

const NoResults = defineAsyncComponent(() => import('./NoResults.vue'));

const IconDetailOverlay = defineAsyncComponent(() => import('./IconDetailOverlay.vue'));

watch(searchQueryDebounced, () => {
  scrollTo(0);
});

function handleCloseDrawer() {
  setActiveIconName('');

  const url = new URL(window.location.href);
  url.pathname = '/icons/';

  if (searchQueryDebounced.value) {
    url.searchParams.set('search', searchQueryDebounced.value);
  }

  window.history.pushState({}, '', url);
}
</script>

<template>
  <div
    ref="overviewEl"
    class="overview-container"
    :class="{ 'icon-drawer-open': activeIconName }"
  >
    <StickyBar>
      <InputSearch
        :placeholder="`Search ${icons.length} icons…`"
        v-model="searchQuery"
        ref="searchInput"
        :shortcut="kbdSearchShortcut"
        class="input-wrapper"
        @focus="() =>prefetchAlgoliaClient(algoliaSearchOptions)"
      />

      <Select
        id="sort-select"
        :items="SORTING"
        v-model="selectedSort"
      >
        <template #start-icon>
          <Icon
            :iconNode="listSortDescending"
            name="list-sort-descending"
            class="chevron-icon"
            aria-hidden="true"
          />
        </template>
      </Select>
    </StickyBar>
    <NoResults
      v-if="searchPlaceholder.isNoResults && !isSearchSettling"
      :searchQuery="searchPlaceholder.query"
      :isBrandSearch="searchPlaceholder.isBrand"
      @clear="searchQuery = ''"
    />
    <IconGrid
      v-else-if="list.length === 0"
      overlayMode
      :icons="displayedIcons.slice(0, initialGridItems)"
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
  /* view-transition-name: icons-search-box; */
}
</style>
