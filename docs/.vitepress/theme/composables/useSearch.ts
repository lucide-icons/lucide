import Fuse from 'fuse.js';
import { shallowRef, computed, Ref } from 'vue';

const useSearch = <T>(
  query: Ref<string>,
  collection: Ref<T[]>,
  keys: Fuse.FuseOptionKeyObject<T>[] = [],
) => {
  const index = shallowRef(
    new Fuse(collection.value, {
      threshold: 0.2,
      keys,
    }),
  );

  const results = computed(() => {
    index.value.setCollection(collection.value);

    if (query.value) {
      return index.value.search(query.value).map((result) => result.item);
    }

    if (keys.length !== 0) {
      const mainKey = keys[0].name;

      return collection.value.sort((a, b) => {
        const aString = a[mainKey as keyof T] as string;
        const bString = b[mainKey as keyof T] as string;
        return aString.localeCompare(bString);
      });
    }

    return collection.value;
  });

  return results;
};

export default useSearch;
