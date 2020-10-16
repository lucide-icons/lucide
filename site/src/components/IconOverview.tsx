import { Icon, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/core";
import IconList from "./IconList";
import { useEffect, useRef, useState } from "react";
import useSearch from "../lib/search";
import { useRouter } from 'next/router';
import { useDebounce } from '../lib/useDebounce';

const IconOverview = ({data}) => {
  const router = useRouter();
  const { query } = router.query;
  const [queryText, setQueryText] = useState(query || '');
  const debouncedQuery = useDebounce(queryText, 1000);
  const results = useSearch(data, queryText);

  const inputElement = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "/" && inputElement.current !== document.activeElement) {
      event.preventDefault();
      inputElement.current.focus();
    }
  }

  useEffect(() => {
    setQueryText(query || '');
  }, [query]);

  useEffect(() => {
    const { query } = router;

    router.push({
      query: {
        ...query,
        query: debouncedQuery
      },
    });
  }, [debouncedQuery]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <InputGroup position="sticky" top={4} zIndex={1}>
        <InputLeftElement children={<Icon name="search" />} />
        <Input
          ref={inputElement}
          placeholder={`Search ${Object.keys(data).length} icons (Press "/" to focus)`}
          value={queryText}
          onChange={(event) => setQueryText(event.target.value)}
          marginBottom={5}
        />
      </InputGroup>
      {results.length > 0 ? (
        <IconList icons={results} />
      ) : (
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          style={{ wordBreak: "break-word" }}
        >
          No results found for "{query}"
        </Text>
      )}
    </>
  );
}

export default IconOverview;
