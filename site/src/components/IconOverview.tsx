import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorMode,
  Icon,
  useColorModeValue,
} from '@chakra-ui/core';
import IconList from './IconList';
import IconCategory from './IconCategory'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSearch from '../lib/useSearch';
import { useRouter } from 'next/router';
import theme from '../lib/theme';
import { Search as SearchIcon, Library, LayoutGrid } from 'lucide-react';
import categories from '../../../categories.json'
import debounce from 'lodash/debounce';

const isFilledString = (string) => string !== undefined && string !== null && string !== '';

const IconOverview = ({ data }) => {
  const router = useRouter();
  const { search } = router.query;

  const [queryText, setQueryText] = useState(search);
  const { colorMode } = useColorMode();
  const [ categoryView, setCategoryView ] = useState(false);
  const inputBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);

  const CategoryViewIcon = categoryView ?  LayoutGrid : Library;

  const inputElement = useRef(null);

  function handleKeyDown(event) {
    if (event.key === '/' && inputElement.current !== document.activeElement) {
      event.preventDefault();
      inputElement.current.focus();
    }
  }

  const toggleCategoryView = useCallback(() => {
    setCategoryView(!categoryView);
  }, [categoryView]);

  useEffect(() => {
    setQueryText(search || '');
  }, [search]);

  const setQueryParam = (searchString) => {
    const { query, asPath } = router;
    if(isFilledString(searchString)) {
      let route = {
        pathname: '',
        query
      }

      if(query.iconName) {
        route.query.iconName = query.iconName;
        route.pathname = '/icon/[iconName]';
      }

      route.query.search = searchString;

      router.replace(route);
    }
    else {
      if (query?.search) {
        delete query.search;
        router.replace({
          query
        })
      }
    }
  }

  // @ts-ignore
  const searchResults = useMemo(() => useSearch(data, queryText), [data, queryText])

  const handleSearchInput = debounce((event) => {
    event.persist();
    const { value = '' } = inputElement?.current;

    setQueryText(value)
    setQueryParam(value)
  }, 400)

  useEffect(() => {
    setQueryText(search)
  }, [search]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <InputGroup position="sticky" top={4} zIndex={1}>
        <InputLeftElement
          children={
            <Icon>
              <SearchIcon />
            </Icon>
          }
        />
        <Input
          ref={inputElement}
          placeholder={`Search ${Object.keys(data).length} icons (Press "/" to focus)`}
          onChange={handleSearchInput}
          defaultValue={queryText}
          bg={colorMode == 'light' ? theme.colors.white : theme.colors.gray[700]}
        />
      </InputGroup>
      <Box marginTop={5} marginBottom={320}>
        {searchResults.length > 0 ? (
            categoryView ?
            <IconCategory icons={searchResults} data={data} categories={categories}/>
            :
            <IconList icons={searchResults} />
        ) : (
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            style={{ wordBreak: 'break-word' }}
          >
            No results found for "{queryText}"
          </Text>
        )}
      </Box>
    </>
  );
};

export default IconOverview;
