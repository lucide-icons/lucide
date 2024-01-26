import Fuse from 'fuse.js';
import { shallowRef, computed, Ref } from 'vue';

const useSearch = <T>(query: Ref<string>, collection: Ref<T[]>, keys: Fuse.FuseOptionKey<T>[] = []) => {
  const index = shallowRef(
    new Fuse(collection.value, {
      threshold: 0.2,
      keys,
    })
  )

  const results = computed(() => {
    index.value.setCollection(collection.value);

    if (query.value) {
      return index.value.search(query.value).map((result) => result.item);
    }

    return collection.value;
  });

  return results;
};

export default useSearch;
