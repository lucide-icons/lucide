<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue';
import type { IconEntity, Category } from '../../types';
import useSearch from '../../composables/useSearch';
import InputSearch from '../base/InputSearch.vue';
import useSearchInput from '../../composables/useSearchInput';
import StickyBar from './StickyBar.vue';
import IconGrid from './IconGrid.vue'
import useFetchTags from '../../composables/useFetchTags';
import useFetchCategories from '../../composables/useFetchCategories';
import { useElementSize, useEventListener, useVirtualList } from '@vueuse/core';
import chunkArray from '../../utils/chunkArray';
import { useCategoryView } from '../../composables/useCategoryView';

const ICON_SIZE = 56;
const ICON_GRID_GAP = 8;

const props = defineProps<{
  icons: IconEntity[];
  categories: Category[];
  iconCategories: Record<string, string[]>;
}>();

const activeIconName = ref(null);
const { searchInput, searchQuery, searchQueryDebounced } = useSearchInput();
const { selectedCategory, categoryCounts } = useCategoryView();

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

type CategoryNameRow = {
  type: 'category';
  title: string;
  name: string;
};

type CategoryIconsRow = {
  type: 'icons';
  icons: IconEntity[];
};

type CategoryRow = CategoryNameRow | CategoryIconsRow;

const categories = computed(() => {
  if (!props.categories?.length || !props.icons?.length) return [];

  return props.categories
    .map(({ name, title }) => {
      const categoryIcons = props.icons.filter((icon) => {
        const iconCategories = props.iconCategories[icon.name];

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

watch(categories, (items) => {
  categoryCounts.value = Object.fromEntries(
    items.map(({ name, icons }) => [name, icons.length])
  );
})

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

function scrollToSelectedCategory(selectedCategory: string) {
  const category = props.categories.find((category) => category.name === selectedCategory)

  if (category != null) {
    const categoryRowIndex = categoriesList.value.findIndex((row) => row.type === 'category' && row.name === selectedCategory)

    if (categoryRowIndex !== -1) {
      setTimeout(() => {
        scrollTo(categoryRowIndex)
      }, 0)
    }
  }
}

watch(selectedCategory, scrollToSelectedCategory)

onMounted(() => {
  setTimeout(() => {
    scrollToSelectedCategory(selectedCategory.value)
  }, 0)
})

watch(searchQueryDebounced, () => {
  scrollTo(0)
})
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
    <NoResults v-if="categories.length === 0" :searchQuery="searchQuery" @clear="searchQuery = ''" />
    <div v-bind="wrapperProps">
      <template v-for="{ index, data } in list" :key="index">
        <h2
          v-if="data.type === 'category'"
          class="title"
        >
          <a class="header-anchor" :href="`#${data.name}`" :aria-label="`Permalink to &quot;${data.title}&quot;`">&ZeroWidthSpace;</a>
          {{ data.title }}
        </h2>
        <IconGrid
          v-else-if="data.type === 'icons'"
          :activeIcon="activeIconName"
          :icons="data.icons"
          @setActiveIcon="setActiveIconName"
          overlayMode
        />
      </template>
    </div>
  </div>
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
