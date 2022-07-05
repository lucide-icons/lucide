import { Box, Text, IconButton, HStack, Collapse } from '@chakra-ui/react';
import React, { useState } from 'react';
import useSearch from '../lib/useSearch';
import { IconEntity } from '../types';
import IconList from './IconList';
import { SearchInput } from './SearchInput';

import { LayoutGrid, Library } from 'lucide-react';

import categories from '../../../categories.json';
import IconCategoryList from './IconCategoryList';
import { IconCustomizerDrawer } from './IconCustomizerDrawer';

interface IconOverviewProps {
  data: IconEntity[];
}

const IconOverview = ({ data }: IconOverviewProps): JSX.Element => {
  const [query, setQuery] = useState('');

  const [categoryView, setCategoryView] = useState(true);
  const CategoryViewIcon = categoryView ? LayoutGrid : Library;

  const searchResults = useSearch(query, data, [
    { name: 'name', weight: 2 },
    { name: 'tags', weight: 1 },
  ]);

  return (
    <>
      <HStack position="sticky" top={4} zIndex={1} gap={2}>
        <IconButton
          // size="sm"
          aria-label="Close overlay"
          variant="solid"
          color="current"
          onClick={() => setCategoryView(currentView => !currentView)}
          icon={<CategoryViewIcon />}
        />
        <SearchInput onChange={setQuery} count={data.length} />
        <IconCustomizerDrawer size="md" paddingX={6} />
      </HStack>

      <HStack marginTop={5} marginBottom="320px">
        <Box
          display={categoryView ? 'none' : 'block'}
          alignSelf="flex-start"
          // transition="ease-in width 160ms .1s"
          willChange="width"
        >
          <Box width={240} position="sticky" top={64}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, inventore.
          </Box>
        </Box>
        <Box flex={1}>
          {searchResults.length > 0 ? (
            categoryView ? (
              <IconCategoryList icons={searchResults} data={data} categories={categories} />
            ) : (
              <IconList icons={searchResults} />
            )
          ) : (
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" wordBreak="break-word">
              No results found for "{query}"
            </Text>
          )}
        </Box>
      </HStack>
    </>
  );
};

export default IconOverview;
