import { Ref, onMounted, watch } from 'vue';
import { CategoryRow } from '../components/icons/IconsCategory.vue';
import { Category } from '../types';
import { useCategoryView } from './useCategoryView';

interface UseScrollToCategory {
  categories: Ref<Pick<Category, 'name' | 'icons'>[]>;
  categoriesList: Ref<CategoryRow[]>;
  scrollTo: (index: number) => void;
  searchQueryDebounced: Ref<string>;
}

export default function useScrollToCategory({
  categories,
  categoriesList,
  scrollTo,
  searchQueryDebounced,
}: UseScrollToCategory) {
  const { selectedCategory, categoryCounts } = useCategoryView();

  function scrollToSelectedCategory(selectedCategory: string) {
    const category = categories.value.find((category) => category.name === selectedCategory);

    if (category != null) {
      const categoryRowIndex = categoriesList.value.findIndex(
        (row) => row.type === 'category' && row.name === selectedCategory,
      );

      if (categoryRowIndex !== -1) {
        setTimeout(() => {
          scrollTo(categoryRowIndex);
        }, 0);
      }
    }
  }

  watch(selectedCategory, (value) => {
    if (value) {
      scrollToSelectedCategory(value);
    } else {
      scrollTo(0);
    }
  });

  onMounted(() => {
    setTimeout(() => {
      scrollToSelectedCategory(selectedCategory.value);
    }, 0);
  });

  watch(searchQueryDebounced, () => {
    if (selectedCategory.value) {
      scrollToSelectedCategory(selectedCategory.value);
    } else {
      scrollTo(0);
    }
  });

  watch(categories, (items) => {
    categoryCounts.value = Object.fromEntries(items.map(({ name, icons }) => [name, icons.length]));
  });
}
