import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import theme from '../lib/theme';
import useSearch from '../lib/useSearch';
import { useSyncQuery } from '../lib/useSyncQuery';
import { IconEntity } from '../types';
import IconList from './IconList';

interface IconOverviewProps {
  data: IconEntity[];
}

const IconOverview = ({ data }: IconOverviewProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const inputElement = useRef(null);

  const querySearch = router.query.search;
  const initialQuery = typeof querySearch === 'string' ? querySearch : undefined;

  const [searchResults, { query, setQuery }] = useSearch(data, initialQuery, [
    { name: 'name', weight: 2 },
    { name: 'tags', weight: 1 },
  ]);

  useSyncQuery('search', query, setQuery);

  // Keyboard `/` shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && inputElement.current !== document.activeElement) {
        event.preventDefault();
        inputElement.current.focus();
      }
    };

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
          placeholder={`Search ${data.length} icons (Press "/" to focus)`}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          bg={colorMode == 'light' ? theme.colors.white : theme.colors.gray[700]}
        />
      </InputGroup>
      <Box marginTop={5}>
        {searchResults.length > 0 ? (
          <IconList icons={searchResults} />
        ) : (
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" wordBreak="break-word">
            No results found for "{query}"
          </Text>
        )}
      </Box>
    </>
  );
};

export default IconOverview;
