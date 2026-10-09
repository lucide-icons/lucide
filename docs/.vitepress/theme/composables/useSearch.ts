import Fuse, { type FuseOptionKeyObject } from 'fuse.js';
import { shallowRef, computed, Ref } from 'vue';

const useSearch = <T>(
  query: Ref<string>,
  collection: Ref<T[]>,
  keys: FuseOptionKeyObject<T>[] = [],
) => {
  const index = shallowRef(
    new Fuse(collection.value, {
      threshold: 0.2,
      useExtendedSearch: true,
      keys,
    }),
  );

  const results = computed(() => {
    index.value.setCollection(collection.value);

    if (query.value) {
      return index.value
        .search({ $and: query.value.split(' ').filter((t) => !!t) })
        .map((result) => result.item);
    }

    return collection.value;
  });

  return results;
};

export default useSearch;
