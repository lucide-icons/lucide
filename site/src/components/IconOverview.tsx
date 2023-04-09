import { Box, Text, IconButton, HStack } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import useSearch from '../lib/useSearch';
import IconList from './IconList';
import { SearchInput } from './SearchInput';
import { Category, IconEntity } from '../types';

import { SidebarClose, SidebarOpen } from 'lucide-react';

import IconCategoryList from './IconCategoryList';
import { IconCustomizerDrawer } from './IconCustomizerDrawer';
import IconCategoryDrawer from './IconCategoryDrawer';

interface IconOverviewProps {
  data: IconEntity[];
  categories: Category[]
}

const IconOverview = ({ data, categories }: IconOverviewProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean | undefined>();
  const [categoryView, setCategoryView] = useState(false);

  useEffect(() => {
    if(
      typeof window !== 'undefined' &&
      window.location.href.split('#').length === 2
    ) {
      const [,hash] = window.location.href.split('#')

      setCategoryView(categories.some(({ name }) => name === hash))
    }
  }, [])

  const SidebarIcon = sidebarOpen ? SidebarOpen : SidebarClose;

  const searchResults = useSearch(query, data, [
    { name: 'name', weight: 2 },
    { name: 'tags', weight: 1 },
  ]);

  return (
    <Box>
      <HStack position="sticky" top={0} zIndex={1} gap={2} padding={5}>
        <IconButton
          aria-label="Close overlay"
          variant="solid"
          color="current"
          onClick={() => setSidebarOpen(currentView => {
            if(currentView == null) {
              return false
            }

            return !currentView
          })}
          icon={<SidebarIcon />}
        />
        <SearchInput onChange={setQuery} count={data.length} />
        <IconCustomizerDrawer size="md" paddingX={6} />
      </HStack>

      <HStack marginBottom="320px" padding={5} alignItems="flex-start">
        <IconCategoryDrawer
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories}
          data={data}
          setCategoryView={setCategoryView}
        />
        <Box flex={1} paddingTop={1}>
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
    </Box>
  );
};

export default memo(IconOverview)
