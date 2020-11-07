import { Box, Input, InputGroup, InputLeftElement, Text, Icon, IconButton, useColorModeValue } from "@chakra-ui/core";
import IconList from "./IconList";
import IconCategory from './IconCategory'
import { useCallback, useEffect, useRef, useState } from "react";
import useSearch from "../lib/search";
import { useRouter } from 'next/router';
import { useDebounce } from '../lib/useDebounce';
import theme from "../lib/theme";
import { Search as SearchIcon } from 'lucide-react';
import { Library, LayoutGrid } from 'lucide-react';
import categories from '../../../categories.json'

const IconOverview = ({data }) => {
  const router = useRouter();
  const { query } = router.query;
  const [queryText, setQueryText] = useState(query || '');
  const debouncedQuery = useDebounce(queryText, 1000);
  const results = useSearch(data, queryText);
  const [ categoryView, setCategoryView ] = useState(false);
  const inputBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);

  const CategoryViewIcon = categoryView ?  LayoutGrid : Library;

  const inputElement = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "/" && inputElement.current !== document.activeElement) {
      event.preventDefault();
      inputElement.current.focus();
    }
  }

  const toggleCategoryView = useCallback(() => {
    setCategoryView(!categoryView);
  }, [categoryView]);

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
        <InputLeftElement children={(<Icon><SearchIcon /></Icon>)} />
        <Input
          ref={inputElement}
          placeholder={`Search ${Object.keys(data).length} icons (Press "/" to focus)`}
          value={queryText}
          onChange={(event) => setQueryText(event.target.value)}
          bg={inputBackground}
        />
         <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to category view`}
            color="current"
            ml="3"
            onClick={toggleCategoryView}
            icon={<CategoryViewIcon />}
          />
      </InputGroup>
      <Box marginTop={5} marginBottom={320}>
        {results.length > 0 ? (
            categoryView ?
            <IconCategory icons={results} data={data} categories={categories}/>
            :
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
      </Box>
    </>
  );
}

export default IconOverview;
