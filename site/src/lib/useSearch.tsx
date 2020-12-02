import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';

function useSearch(icons: Array<any>, query:string) {
  if(!query) return icons;

  const searchString = query.toLowerCase()

  return icons.filter(({ name, tags }) => {
    const icon = { name, tags };

    return Object.keys(icon).some(
      key => String(icon[key])
          .toLowerCase()
          .includes(searchString)
    )
  });
}

export default useSearch;
