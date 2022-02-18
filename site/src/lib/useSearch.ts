import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';

const useSearch = <T>(collection: T[], initialQuery = '', keys: Fuse.FuseOptionKey[]) => {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query.trim(), 200);

  const index = useMemo(() => {
    return new Fuse(collection, {
      threshold: 0.2,
      keys,
    });
  }, [collection]);

  const results = useMemo(() => {
    if (debouncedQuery) {
      return index.search(debouncedQuery).map((result) => result.item);
    }

    return collection;
  }, [debouncedQuery, index]);

  return [results, { query, setQuery }] as const;
};

export default useSearch;
