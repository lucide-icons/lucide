import { ref, Ref, watch } from 'vue';
import BRAND_STOPWORDS from '../../data/brandStopwords.json' with { type: 'json' };

export default function useSearchPlaceholder(
  searchQuery: Ref<string, string>,
  results: Ref<{ name: string }[]>,
) {
  const state = ref({
    isNoResults: false,
    isBrand: false,
    query: '',
  });

  watch(
    results,
    () => {
      const query = searchQuery.value;
      const searchResults = results.value;
      if (query.length > 0 && searchResults.length === 0) {
        for (const stopword of Object.keys(BRAND_STOPWORDS)) {
          if (stopword.startsWith(query)) {
            state.value = {
              isNoResults: true,
              isBrand: true,
              query: BRAND_STOPWORDS[stopword],
            };
            return;
          }
        }
      }
      state.value = {
        isNoResults: query in BRAND_STOPWORDS && searchResults.length === 0 && query !== '',
        isBrand: query in BRAND_STOPWORDS,
        query: BRAND_STOPWORDS[query] ?? query,
      };
    },
    { immediate: true },
  );

  return state;
}
