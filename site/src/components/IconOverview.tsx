import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import useSearch from '../lib/useSearch';
import { IconEntity } from '../types';
import IconList from './IconList';
import { SearchInput } from './SearchInput';

interface IconOverviewProps {
  data: IconEntity[];
}

const IconOverview = ({ data }: IconOverviewProps): JSX.Element => {
  const [query, setQuery] = useState('');

  const searchResults = useSearch(query, data, [
    { name: 'name', weight: 2 },
    { name: 'tags', weight: 1 },
  ]);

  return (
    <>
      <Box position="sticky" top={4} zIndex={1}>
        <SearchInput onChange={setQuery} count={data.length} />
      </Box>

      <Box marginTop={5} marginBottom="320px">
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
