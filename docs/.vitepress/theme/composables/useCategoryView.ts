import {
  ref, inject, Ref
} from 'vue';

export const CATEGORY_VIEW_CONTEXT = Symbol('categoryView');

interface CategoryViewContext {
  selectedCategory: Ref<string>
  categoryCounts: Ref<Record<string, number>>
}

export const categoryViewContext = {
  selectedCategory: ref(''),
  categoryCounts: ref({}),
};

export function useCategoryView(): CategoryViewContext {
  const context = inject<CategoryViewContext>(CATEGORY_VIEW_CONTEXT);

  if (!context) {
    throw new Error('useCategoryView must be used with categoryView context');
  }

  return context;
}
