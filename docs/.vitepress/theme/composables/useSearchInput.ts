import { useDebounce } from '@vueuse/core';
import { nextTick, onMounted, ref, watch } from 'vue';

const useSearchInput = () => {
  const searchInput = ref();
  const searchQuery = ref(
    typeof window === 'undefined'
      ? ''
      : new URLSearchParams(window.location.search).get('search') || ''
  );
  const searchQueryDebounced = useDebounce(searchQuery, 250);

  watch(searchQueryDebounced, (searchString) => {
    const newUrl = new URL(window.location.href);

    if (searchString === '') {
      newUrl.searchParams.delete('search');
    } else {
      newUrl.searchParams.set('search', searchString);
    }

    nextTick(() => {
      window.history.replaceState({}, '', newUrl);
    });
  });

  onMounted(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('focus')) {
      searchInput.value.focus();
    }
  });

  return {
    searchInput,
    searchQuery,
    searchQueryDebounced,
  };
};

export default useSearchInput;
