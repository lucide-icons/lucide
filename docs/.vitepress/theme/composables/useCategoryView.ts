import { useRoute } from 'vitepress';
import { ref, inject, Ref, onMounted, watch } from 'vue';

export const CATEGORY_VIEW_CONTEXT = Symbol('categoryView');

interface CategoryViewContext {
  selectedCategory: Ref<string>;
  categoryCounts: Ref<Record<string, number>>;
}

export const categoryViewContext = {
  selectedCategory: ref(),
  categoryCounts: ref({}),
};

export function useCategoryView(): CategoryViewContext {
  const context = inject<CategoryViewContext>(CATEGORY_VIEW_CONTEXT);
  const route = useRoute();

  if (!context) {
    throw new Error('useCategoryView must be used with categoryView context');
  }

  onMounted(() => {
    if (window.location.hash) {
      context.selectedCategory.value = decodeURIComponent(window.location.hash.slice(1));
    }
  });

  watch(route, (currentRoute) => {
    if (currentRoute.path !== '/icons/categories') {
      context.selectedCategory.value = '';
      context.categoryCounts.value = {};
    }
  });

  return context;
}
