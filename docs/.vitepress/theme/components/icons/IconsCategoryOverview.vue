<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent, onMounted, nextTick } from 'vue';
import { VirtualGrid, type VirtualGridExposed } from '../../lib/grid-window/vue.js';
import type { IconEntity, Category } from '../../types';
import useSearch from '../../composables/useSearch';
import InputSearch from '../base/InputSearch.vue';
import useSearchInput from '../../composables/useSearchInput';
import useSearchShortcut from '../../utils/useSearchShortcut';
import StickyBar from './StickyBar.vue';
import IconsCategory, { CategoryRow } from './IconsCategory.vue';
import IconItem from './IconItem.vue';
import useFetchTags from '../../composables/useFetchTags';
import useFetchCategories from '../../composables/useFetchCategories';
import { useElementSize, useEventListener, useVirtualList } from '@vueuse/core';
import chunkArray from '../../utils/chunkArray';
import useScrollToCategory from '../../composables/useScrollToCategory';
import { useCategoryView } from '../../composables/useCategoryView';
import CarbonAdOverlay from './CarbonAdOverlay.vue';
import useSearchPlaceholder from '../../utils/useSearchPlaceholder.ts';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;

const props = defineProps<{
  icons: IconEntity[];
  categories: Category[];
  iconCategories: Record<string, string[]>;
}>();

const activeIconName = ref(null);
const { searchInput, searchQuery, searchQueryDebounced } = useSearchInput();
const { selectedCategory } = useCategoryView();
const isSearching = computed(() => !!searchQuery.value);

watch(searchQueryDebounced, (searchString) => {
  if (searchString !== '') {
    selectedCategory.value = '';
  }
});

const { shortcutText: kbdSearchShortcut } = useSearchShortcut(() => {
  searchInput.value?.focus();
});

function setActiveIconName(name: string) {
  activeIconName.value = name;
}

const { execute: fetchTags, data: tags, isFetching: isFetchingTags } = useFetchTags();
const {
  execute: fetchCategories,
  data: categoriesMap,
  isFetching: isFetchingCategories,
} = useFetchCategories();

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
    const iconCategories = categoriesMap.value?.[icon.name] ?? [];

    return {
      ...icon,
      tags: iconTags,
      categories: iconCategories,
    };
  });
});

const searchResults = useSearch(searchQueryDebounced, mappedIcons, [
  { name: 'name', weight: 3 },
  { name: 'aliases', weight: 3 },
  { name: 'tags', weight: 2 },
]);

const categories = computed(() => {
  if (!props.categories?.length || !props.icons?.length) return [];

  return props.categories.map(({ name, title }) => {
    const categoryIcons = props.icons.filter((icon) => {
      const iconCategories = icon?.externalLibrary
        ? icon.categories
        : props.iconCategories[icon.name];

      return iconCategories?.includes(name);
    });

    const searchedCategoryIcons = isSearching
      ? categoryIcons.filter((icon) =>
          searchResults.value.some((item) => item?.name === icon?.name),
        )
      : categoryIcons;

    return {
      title,
      name,
      icons: searchedCategoryIcons,
    };
  });
});

// `?grid=window` swaps the row virtualizer for @grid-window/vue (benchmark flag, client only).
const useGridWindow = ref(false);
const isMounted = ref(false);
const virtualGrid = ref<VirtualGridExposed | null>(null);

const visibleCategories = computed(() => categories.value.filter(({ icons }) => icons.length));

// One flat list of icons with a section (the category title) before each category's first icon.
const gridIcons = computed(() => visibleCategories.value.flatMap(({ icons }) => icons));
const gridSections = computed(() => {
  let index = 0;
  return visibleCategories.value.map(({ title, name, icons }) => {
    const section = { index, title, name, class: 'gw-category' };
    index += icons.length;
    return section;
  });
});

const categoriesList = computed(() => {
  return visibleCategories.value.reduce<CategoryRow[]>((acc, category) => {
    acc.push({ type: 'category', title: category.title, name: category.name });
    // With grid-window only the title rows are listed, so a row index is a section index.
    if (useGridWindow.value) return acc;

    const categoryIcons = chunkArray(category.icons, columnSize.value);
    categoryIcons.forEach((icons) => {
      acc.push({ type: 'icons', icons });
    });

    return acc;
  }, []);
});
const searchPlaceholder = useSearchPlaceholder(searchQuery, searchResults);
const isSearchMetadataLoading = computed(
  () => searchQuery.value.length > 0 && !isFetchingTags && !isFetchingCategories,
);

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(categoriesList, {
  itemHeight: ICON_SIZE + ICON_GRID_GAP,
  overscan: 10,
});

// Scroll so the title lands just below the sticky search bar instead of under it.
async function scrollGridToSection(section: number) {
  const grid = virtualGrid.value;
  if (!grid) return;
  if (section === 0) {
    // Back to the page top like the default path; the grid's scrollTo(0) stops at its first row.
    window.scrollTo({ top: 0 });
    return;
  }
  grid.scrollToSection(section);
  await nextTick();
  requestAnimationFrame(() => {
    const name = gridSections.value[section]?.name;
    const title = overviewEl.value?.querySelector<HTMLElement>(`[data-category="${name}"]`);
    const bar = overviewEl.value?.querySelector<HTMLElement>('.search-bar');
    if (!title || !bar) return;
    window.scrollBy({
      top: title.getBoundingClientRect().top - bar.getBoundingClientRect().bottom,
    });
  });
}

useScrollToCategory({
  categories,
  categoriesList,
  scrollTo: (index) => (useGridWindow.value ? scrollGridToSection(index) : scrollTo(index)),
  searchQueryDebounced,
});

onMounted(() => {
  useGridWindow.value = new URLSearchParams(window.location.search).get('grid') === 'window';
  isMounted.value = true;
  containerProps.ref.value = document.documentElement;
  useEventListener(window, 'scroll', containerProps.onScroll);
});

function loadSearchMetadata() {
  if (tags.value == null && !isFetchingTags.value) {
    void fetchTags();
  }
  if (categoriesMap.value == null && !isFetchingCategories.value) {
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

function handleCloseDrawer() {
  setActiveIconName('');

  const url = new URL(window.location.href);
  url.pathname = '/icons/categories';

  if (searchQueryDebounced.value) {
    url.searchParams.set('search', searchQueryDebounced.value);
  }

  if (selectedCategory.value) {
    url.hash = selectedCategory.value;
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
    <StickyBar class="category-search">
      <InputSearch
        :placeholder="`Search ${icons.length} icons…`"
        v-model="searchQuery"
        :shortcut="kbdSearchShortcut"
        class="input-wrapper"
        ref="searchInput"
        @focus="loadSearchMetadata"
      />
    </StickyBar>
    <NoResults
      v-if="searchPlaceholder.isNoResults && !isSearchMetadataLoading"
      :searchQuery="searchPlaceholder.query"
      :isBrandSearch="searchPlaceholder.isBrand"
      @clear="searchQuery = ''"
    />
    <VirtualGrid
      v-if="useGridWindow && isMounted"
      ref="virtualGrid"
      class="icons icons-gw"
      :count="gridIcons.length"
      :sections="gridSections"
      :overscan="10"
    >
      <template #default="{ index }">
        <div class="icon">
          <IconItem
            :iconNode="gridIcons[index].iconNode"
            :name="gridIcons[index].name"
            :externalLibrary="gridIcons[index].externalLibrary"
            @setActiveIcon="setActiveIconName"
            :active="activeIconName === gridIcons[index].name"
            customizable
            overlayMode
          />
        </div>
      </template>
      <template #section="{ section }">
        <h2
          class="title"
          :data-category="section.name"
        >
          <a
            class="header-anchor"
            :href="`#${section.name}`"
            :aria-label="`Permalink to &quot;${section.title}&quot;`"
            >&ZeroWidthSpace;</a
          >
          {{ section.title }}
        </h2>
      </template>
    </VirtualGrid>
    <div
      v-else
      v-bind="wrapperProps"
    >
      <IconsCategory
        v-for="{ index, data } in list"
        :categoryRow="data"
        :activeIconName="activeIconName"
        @setActiveIcon="setActiveIconName"
        :key="index"
      />
    </div>
  </div>
  <IconDetailOverlay
    v-if="activeIconName != null"
    :iconName="activeIconName"
    @close="handleCloseDrawer"
  />

  <CarbonAdOverlay :drawerOpen="!!activeIconName" />
</template>

<style>
.icons-gw {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 8px;
  width: 100%;
}

.icons-gw .icon {
  aspect-ratio: 1/1;
  position: relative;
}

/* A title takes one grid row; sit it on the row's bottom edge like the row-based layout does. */
.icons-gw .gw-category {
  display: flex;
  align-items: flex-end;
  min-width: 0;
}

.icons-gw .gw-category .title {
  margin: 0;
  padding: 0 0 8px;
  font-size: 19px;
  font-weight: 500;
  line-height: 28px;
}
</style>

<style scoped>
.input-wrapper {
  width: 100%;
}

.search-bar.category-search {
  margin-bottom: 10px;
}

.title {
  margin-bottom: 8px;
  font-size: 19px;
  font-weight: 500;
  padding: 24px 0 8px;
}

.icons {
  margin-bottom: 8px;
}
</style>
