import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';

function useSearch(icons: Object, query: string | string[]) {
  let iconList = useMemo(() => Object.values(icons), [icons]);
  const [results, setResults] = useState(iconList);
  // query can be an array because this is a valid query string ?query=xyz&query=abc
  const debouncedQuery = useDebounce(
    typeof query === 'string' ? query.trim() : typeof query === 'undefined' ? '' : query[0].trim(),
    300
  );

  async function doSearch() {
    if (debouncedQuery) {
      const Fuse = (await import('fuse.js')).default;
      const fuse = new Fuse(iconList, {
        threshold: 0.2,
        keys: ['name', 'tags'],
      });
      return fuse.search(debouncedQuery);
    } else {
      return iconList;
    }
  }

  useEffect(() => {
    doSearch().then(setResults);
  }, [debouncedQuery]);

  return results;
}

export default useSearch;
