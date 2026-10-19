import { computed, ref, shallowRef, watch, type ComputedRef, type Ref } from 'vue';
import { searchIconIds } from '../utils/algolia';
import { DefaultTheme, useData } from 'vitepress';

export interface SearchableIcon {
  name: string;
  externalLibrary?: string;
}

/**
 * Matches the `objectID` scheme of the Algolia `icons` index:
 * `name` for core icons, `lab/<name>` for lab icons.
 */
export const entityId = (icon: SearchableIcon) =>
  icon.externalLibrary ? `${icon.externalLibrary}/${icon.name}` : icon.name;

export interface UseIconSearchResult<T> {
  /** Matching icons in relevance order, or the full collection when the query is empty. */
  results: ComputedRef<T[]>;
  /** `true` while a search request is in flight. */
  isPending: Ref<boolean>;
}

const useIconSearch = <T extends SearchableIcon>(
  query: Ref<string>,
  collection: Ref<T[]>,
  algoliaSearchOptions: DefaultTheme.AlgoliaSearchOptions,
): UseIconSearchResult<T> => {
  const byId = computed(() => new Map(collection.value.map((icon) => [entityId(icon), icon])));

  const hitIds = shallowRef<string[]>([]);
  const isPending = ref(false);
  let requestSeq = 0;

  watch(
    query,
    async (searchQuery) => {
      const seq = ++requestSeq;

      if (!searchQuery) {
        isPending.value = false;
        return;
      }

      isPending.value = true;

      try {
        const ids = await searchIconIds(searchQuery, algoliaSearchOptions);

        if (seq === requestSeq) {
          hitIds.value = ids;
        }
      } catch (error) {
        console.error('Icon search failed', error);

        if (seq === requestSeq) {
          hitIds.value = [];
        }
      } finally {
        if (seq === requestSeq) {
          isPending.value = false;
        }
      }
    },
    { immediate: true },
  );

  const results = computed(() => {
    if (!query.value) {
      return collection.value;
    }

    // Hits without a local entity are dropped: lab icons while the Lab library is not
    // loaded, or icons the crawler indexed after this build was deployed.
    return hitIds.value
      .map((id) => byId.value.get(id))
      .filter((icon): icon is T => icon !== undefined);
  });

  return { results, isPending };
};

export default useIconSearch;
