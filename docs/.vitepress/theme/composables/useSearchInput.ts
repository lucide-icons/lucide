import { refThrottled } from '@vueuse/core';
import { nextTick, onMounted, ref, watch } from 'vue';

const useSearchInput = () => {
  const searchInput = ref()
  const searchQuery = ref(
    typeof window === 'undefined'
    ? ''
    : (
      new URLSearchParams(window.location.search).get('search')
      || ''
      )
  )
  const searchQueryThrottled = refThrottled(searchQuery, 400)

  watch(searchQueryThrottled, (searchString) => {
    const newUrl = new URL(window.location.href);

    if(searchString === '') {
      newUrl.searchParams.delete('search');
    } else {
      newUrl.searchParams.set('search', searchString);
    }

    nextTick(() => {
      window.history.replaceState({}, '', newUrl)
    })
  })

  onMounted(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('focus')) {
      searchInput.value.focus()
    }
  })

  return {
    searchInput,
    searchQuery,
    searchQueryThrottled
  };
};

export default useSearchInput;
