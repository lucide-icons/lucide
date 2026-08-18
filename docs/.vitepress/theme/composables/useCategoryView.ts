import { useRoute } from 'vitepress';
import { ref, inject, Ref, onMounted, onUnmounted, watch } from 'vue';

export const CATEGORY_VIEW_CONTEXT = Symbol('categoryView');

interface CategoryViewContext {
  selectedCategory: Ref<string>;
  categoryCounts: Ref<Record<string, number>>;
}

export const categoryViewContext = {
  selectedCategory: ref(),
  categoryCounts: ref({}),
};

const CATEGORIES_PATH = '/icons/categories';

export function useCategoryView(): CategoryViewContext {
  const context = inject<CategoryViewContext>(CATEGORY_VIEW_CONTEXT);

  if (!context) {
    throw new Error('useCategoryView must be used with categoryView context');
  }

  return context;
}

export function useCategoryViewSync(): CategoryViewContext {
  const context = useCategoryView();
  const route = useRoute();

  function syncCategoryFromLocation() {
    if (!window.location.pathname.startsWith(CATEGORIES_PATH)) {
      context.selectedCategory.value = '';
      context.categoryCounts.value = {};
      return;
    }

    context.selectedCategory.value = window.location.hash
      ? decodeURIComponent(window.location.hash.slice(1))
      : '';
  }

  onMounted(() => {
    syncCategoryFromLocation();
    window.addEventListener('hashchange', syncCategoryFromLocation);
    window.addEventListener('popstate', syncCategoryFromLocation);
  });

  onUnmounted(() => {
    window.removeEventListener('hashchange', syncCategoryFromLocation);
    window.removeEventListener('popstate', syncCategoryFromLocation);
  });

  watch(route, (currentRoute) => {
    if (currentRoute.path !== CATEGORIES_PATH) {
      context.selectedCategory.value = '';
      context.categoryCounts.value = {};
      return;
    }

    syncCategoryFromLocation();
  });

  return context;
}
