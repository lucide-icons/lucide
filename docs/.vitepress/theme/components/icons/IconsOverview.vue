<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue';
import type { IconEntity } from '../../types';
import { useElementSize, useEventListener, useStorage, useVirtualList } from '@vueuse/core';
import { useRoute } from 'vitepress';
import IconGrid from './IconGrid.vue';
import IconList from './IconList.vue';
import Select from '../base/Select.vue';
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
import Icon from '@lucide/vue/src/Icon';
import {
  listSortDescending,
  layoutGrid,
  list as listIcon,
  copy,
  check,
} from '~/.vitepress/data/iconNodes';
import IconButton from '../base/IconButton.vue';
import Tooltip from '../base/Tooltip.vue';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;
const LIST_ITEM_SIZE = 48;
const VIEW_STORAGE_KEY = 'lucide-icons-view';
const VIEWS = [
  {
    name: 'Grid',
    value: 'grid',
  },
  {
    name: 'List',
    value: 'list',
  },
];
const SORTING = [
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
]


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
const selectedSort = ref(SORTING[0])
const selectedView = useStorage(VIEW_STORAGE_KEY, VIEWS[0], undefined, {
  serializer: {
    read: (value) => VIEWS.find((view) => view.value === value) ?? VIEWS[0],
    write: (view) => view.value,
  },
});
const isListView = computed(() => selectedView.value.value === 'list');
const justCopied = ref(false);

const { execute: fetchTags, data: tags, isFetching: isFetchingTags } = useFetchTags();
const {
  execute: fetchCategories,
  data: categories,
  isFetching: isFetchingCategories,
} = useFetchCategories();

const overviewEl = ref<HTMLElement | null>(null);
const { width: containerWidth } = useElementSize(overviewEl);

const columnSize = computed(() => {
  return Math.floor(containerWidth.value / (ICON_SIZE + ICON_GRID_GAP));
});

const sortedIcons = computed(() => {
  switch (selectedSort.value.value) {
    case 'popularity':
      return [...props.icons].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    case 'release-date':
      return [...props.icons].sort((a, b) => {
        const aDate = a.createdRelease?.date ? new Date(a.createdRelease.date).getTime() : 0;
        const bDate = b.createdRelease?.date ? new Date(b.createdRelease.date).getTime() : 0;
        return bDate - aDate;
      });
    case 'name':
      return [...props.icons].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return props.icons;
  }
});

const mappedIcons = computed(() => {
  if (tags.value == null) {
    return sortedIcons.value;
  }

  return sortedIcons.value.map((icon) => {
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
  { name: 'aliases', weight: 8 },
  { name: 'tags', weight: 2 },
  { name: 'categories', weight: 1 },
]);

const searchPlaceholder = useSearchPlaceholder(searchQuery, searchResults);
const isSearchMetadataLoading = computed(
  () => searchQuery.value.length > 0 && (tags.value == null || categories.value == null),
);

const chunkedIcons = computed(() => {
  return chunkArray(searchResults.value, isListView.value ? 1 : columnSize.value);
});

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(chunkedIcons, {
  itemHeight: () => (isListView.value ? LIST_ITEM_SIZE : ICON_SIZE) + ICON_GRID_GAP,
  overscan: 10,
});

async function copyIconNames() {
  await navigator.clipboard.writeText(searchResults.value.map((icon) => icon.name).join('\n'));

  justCopied.value = true;
  setTimeout(() => (justCopied.value = false), 2000);
}

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

function loadSearchMetadata() {
  if (tags.value == null && !isFetchingTags.value) {
    void fetchTags();
  }
  if (categories.value == null && !isFetchingCategories.value) {
    void fetchCategories();
  }
}

watch(searchQuery, (searchString) => {
  if (searchString !== '') {
    loadSearchMetadata();
  }
});

const NoResults = defineAsyncComponent(() => import('./NoResults.vue'));

const IconDetailOverlay = defineAsyncComponent(() => import('./IconDetailOverlay.vue'));

watch(searchQueryDebounced, () => {
  scrollTo(0);
});

function handleCloseDrawer() {
  setActiveIconName('');

  const url = new URL(window.location);
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
        @focus="loadSearchMetadata"
      />

      <Select
        id="sort-select"
        :items="SORTING"
        v-model="selectedSort"
      >
        <template #start-icon>
          <Icon
            :iconNode="listSortDescending"
            class="chevron-icon"
            aria-hidden="true"
          />
        </template>
      </Select>

      <Select
        id="view-select"
        :items="VIEWS"
        v-model="selectedView"
      >
        <template #start-icon>
          <Icon
            :iconNode="isListView ? listIcon : layoutGrid"
            class="chevron-icon"
            aria-hidden="true"
          />
        </template>
      </Select>

      <Tooltip :title="`Copy ${searchResults.length} icon names`">
        <IconButton
          class="copy-names-button"
          :aria-label="`Copy ${searchResults.length} icon names`"
          @click="copyIconNames"
        >
          <Icon
            :iconNode="justCopied ? check : copy"
            :size="20"
            aria-hidden="true"
          />
        </IconButton>
      </Tooltip>
    </StickyBar>
    <NoResults
      v-if="searchPlaceholder.isNoResults && !isSearchMetadataLoading"
      :searchQuery="searchPlaceholder.query"
      :isBrandSearch="searchPlaceholder.isBrand"
      @clear="searchQuery = ''"
    />
    <component
      :is="isListView ? IconList : IconGrid"
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
      <component
        :is="isListView ? IconList : IconGrid"
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

.search-bar .reference {
  display: flex;
  flex-shrink: 0;
}

.copy-names-button {
  display: flex;
  width: 48px;
  align-items: center;
  justify-content: center;
  padding: 11px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.input-wrapper {
  width: 100%;
  min-width: 0;
  /* view-transition-name: icons-search-box; */
}
</style>
