import Fuse from 'fuse.js';
import { shallowRef, computed, Ref } from 'vue';

const useSearch = <T>(query: Ref<string>, collection: T[], keys: Fuse.FuseOptionKey<T>[] = []) => {
  const index = shallowRef(
    new Fuse(collection, {
    threshold: 0.2,
    keys,
    })
  )

  const results = computed(() => {
    if (query.value) {
      return index.value.search(query.value).map((result) => result.item);
    }

    return collection;
  });

  return results;
};

export default useSearch;
