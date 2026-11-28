import { useEventListener } from '@vueuse/core';
import { inject, InjectionKey, provide, Ref } from 'vue';

type TagSearch = (query: string, options: { focusInput: boolean }) => void;

const TAG_SEARCH: InjectionKey<TagSearch> = Symbol('tagSearch');

export const useTagSearch = () => inject(TAG_SEARCH, null);

const trimSlash = (path: string) => path.replace(/\/$/, '');

interface TagSearchOptions {
  gridPath: string;
  searchInput: Ref<HTMLInputElement | undefined>;
  searchQuery: Ref<string>;
  activeIconName: Ref<string | null>;
  scrollTo: (index: number) => void;
}

export function provideTagSearch({
  gridPath,
  searchInput,
  searchQuery,
  activeIconName,
  scrollTo,
}: TagSearchOptions) {
  // drawer entries carry no search, so only grid entries restore one
  useEventListener('popstate', () => {
    if (trimSlash(window.location.pathname) === trimSlash(gridPath)) {
      searchQuery.value = new URLSearchParams(window.location.search).get('search') ?? '';
    }
  });

  provide(TAG_SEARCH, (query, { focusInput }) => {
    activeIconName.value = '';

    const url = new URL(window.location.href);
    url.pathname = gridPath;
    url.searchParams.set('search', query);
    url.hash = '';
    // replacing the drawer's entry keeps Back on the grid the drawer was opened from
    window.history.replaceState(window.history.state, '', url);

    if (query === searchQuery.value) {
      scrollTo(0);
    } else {
      searchQuery.value = query;
    }

    if (focusInput) {
      searchInput.value?.focus();
    }
  });
}
