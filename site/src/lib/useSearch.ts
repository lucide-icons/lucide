import Fuse from 'fuse.js';
import { useMemo } from 'react';

const useSearch = <T>(query = '', collection: T[], keys: Fuse.FuseOptionKey<T>[] = []) => {
  const index = useMemo(() => {
    return new Fuse(collection, {
      threshold: 0.2,
      keys,
    });
  }, [collection]);

  const results = useMemo(() => {
    if (query) {
      return index.search(query).map((result) => result.item);
    }

    return collection;
  }, [query, index]);

  return results;
};

export default useSearch;
