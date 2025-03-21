<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted, watch, watchEffect } from 'vue';
import type { IconEntity, Category } from '../../types';
import useSearch from '../../composables/useSearch';
import InputSearch from '../base/InputSearch.vue';
import useSearchInput from '../../composables/useSearchInput';
import StickyBar from './StickyBar.vue';
import IconsCategory from './IconsCategory.vue';
import useFetchTags from '../../composables/useFetchTags';
import useFetchCategories from '../../composables/useFetchCategories';
import { useElementSize, useEventListener, useVirtualList } from '@vueuse/core';
import chunkArray from '../../utils/chunkArray';
import { CategoryRow } from './IconsCategory.vue';
import useScrollToCategory from '../../composables/useScrollToCategory';
import CarbonAdOverlay from './CarbonAdOverlay.vue';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;

const props = defineProps<{
  icons: IconEntity[];
  categories: Category[];
  iconCategories: Record<string, string[]>;
}>();

const activeIconName = ref(null);
const { searchInput, searchQuery, searchQueryDebounced } = useSearchInput();
const isSearching = computed(() => !!searchQuery.value);

function setActiveIconName(name: string) {
  activeIconName.value = name;
}

const { execute: fetchTags, data: tags } = useFetchTags();
const { execute: fetchCategories, data: categoriesMap } = useFetchCategories();

const overviewEl = ref<HTMLElement | null>(null);
const { width: containerWidth } = useElementSize(overviewEl)

const columnSize = computed(() => {
  return Math.floor((containerWidth.value) / ((ICON_SIZE + ICON_GRID_GAP)));
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

  return props.categories
    .map(({ name, title }) => {
      const categoryIcons = props.icons.filter((icon) => {
        const iconCategories = icon?.externalLibrary ? icon.categories : props.iconCategories[icon.name]

        return iconCategories?.includes(name);
      });

      const searchedCategoryIcons = isSearching
        ? categoryIcons.filter((icon) =>
            searchResults.value.some((item) => item?.name === icon?.name)
          )
        : categoryIcons;

      return {
        title,
        name,
        icons: searchedCategoryIcons,
      };
    })
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

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  categoriesList,
  {
    itemHeight: ICON_SIZE + ICON_GRID_GAP,
    overscan: 10
  },
)

useScrollToCategory({
  categories,
  categoriesList,
  scrollTo,
  searchQueryDebounced,
})

onMounted(() => {
  containerProps.ref.value = document.documentElement;
  useEventListener(window, 'scroll', containerProps.onScroll)
})

function onFocusSearchInput() {
  if (tags.value == null) {
    fetchTags();
  }
  if (categoriesMap.value == null) {
    fetchCategories();
  }
}

const NoResults = defineAsyncComponent(() => import('./NoResults.vue'));
const IconDetailOverlay = defineAsyncComponent(() => import('./IconDetailOverlay.vue'));

function handleCloseDrawer() {
  setActiveIconName('');

  window.history.pushState({}, '', '/icons/categories');
}

watchEffect(() => {

  console.log(props.icons.find((icon) => icon.name === 'burger'));

});
</script>

<template>
  <div ref="overviewEl" class="overview-container">
    <StickyBar class="category-search">
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
    <div v-bind="wrapperProps">
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

.overview-container {
  padding-bottom: 288px;
}
</style>
