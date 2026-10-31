<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import type { IconEntity, Category } from '../../types';
import useSearch from '../../composables/useSearch';
import InputSearch from '../base/InputSearch.vue';
import useSearchInput from '../../composables/useSearchInput';
import useSearchShortcut from '../../utils/useSearchShortcut';
import StickyBar from './StickyBar.vue';
import IconsCategory, { CategoryRow } from './IconsCategory.vue';
import useFetchTags from '../../composables/useFetchTags';
import useFetchCategories from '../../composables/useFetchCategories';
import chunkArray from '../../utils/chunkArray';
import useScrollToCategory from '../../composables/useScrollToCategory';
import useIconGridVirtualizer, {
  useIconGridColumns,
} from '../../composables/useIconGridVirtualizer';
import { useCategoryView } from '../../composables/useCategoryView';
import CarbonAdOverlay from './CarbonAdOverlay.vue';
import useSearchPlaceholder from '../../utils/useSearchPlaceholder.ts';

/** Estimated height of a category heading row. Rows are measured once rendered. */
const CATEGORY_HEADING_HEIGHT = 64;

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
const listEl = ref<HTMLElement | null>(null);
const stickyBar = ref<InstanceType<typeof StickyBar> | null>(null);
const gridColumns = useIconGridColumns(overviewEl);
const { columnSize } = gridColumns;

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

const categoriesList = computed(() => {
  return categories.value
    .filter(({ icons }) => icons.length)
    .reduce<CategoryRow[]>((acc, category) => {
      acc.push({ type: 'category', title: category.title, name: category.name });

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

const { virtualRows, totalSize, offsetTop, measureElement, scrollToIndex, scrollToTop } =
  useIconGridVirtualizer({
    columns: gridColumns,
    listEl,
    stickyEl: stickyBar,
    rows: categoriesList,
    estimateRowSize: (row, iconRowHeight) =>
      row.type === 'category' ? CATEGORY_HEADING_HEIGHT : iconRowHeight,
    getRowKey: (row, index) => (row.type === 'category' ? `category-${row.name}` : index),
  });

useScrollToCategory({
  categories,
  categoriesList,
  scrollToIndex,
  scrollToTop,
  searchQueryDebounced,
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
    <StickyBar
      ref="stickyBar"
      class="category-search"
    >
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
    <div
      ref="listEl"
      class="virtual-list"
      :style="{ height: `${totalSize}px` }"
    >
      <div
        class="virtual-list-rows"
        :style="{ transform: `translateY(${offsetTop}px)` }"
      >
        <div
          v-for="row in virtualRows"
          :key="String(row.key)"
          :ref="measureElement"
          :data-index="row.index"
          class="virtual-row"
        >
          <IconsCategory
            :categoryRow="categoriesList[row.index]"
            :activeIconName="activeIconName"
            @setActiveIcon="setActiveIconName"
          />
        </div>
      </div>
    </div>
  </div>
  <IconDetailOverlay
    v-if="activeIconName != null"
    :iconName="activeIconName"
    @close="handleCloseDrawer"
  />

  <CarbonAdOverlay :drawerOpen="!!activeIconName" />
</template>

<style scoped>
.virtual-list {
  position: relative;
  width: 100%;
}

.virtual-list-rows {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* Contain the row's margins, so the measured height includes them. */
.virtual-row {
  display: flow-root;
}

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
