import Fuse from "fuse.js";
import { useEffect, useState } from "react";

function useSearch(icons, query) {
  const fuse = new Fuse(Object.values(icons), {
    threshold: 0.2,
    keys: ["name", "tags"],
  });

  const [results, setResults] = useState(Object.values(icons));

  useEffect(() => {
    if (query.trim()) {
      setResults(fuse.search(query.trim()));
    } else {
      setResults(Object.values(icons));
    }
  }, [query]);

  return results;
}

export default useSearch;
