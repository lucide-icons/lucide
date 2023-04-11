import {Box, Text, IconButton, HStack, useColorModeValue} from '@chakra-ui/react';
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
  }, [setCategoryView])

  const SidebarIcon = sidebarOpen ? SidebarOpen : SidebarClose;

  const searchResults = useSearch(query, data, [
    { name: 'name', weight: 3 },
    { name: 'categories', weight: 2 },
    { name: 'tags', weight: 1 },
  ]);

  return (
    <Box>
      <HStack position="sticky" top={0} zIndex={1} gap={2} padding={5} bgColor={useColorModeValue('white', 'darkgray.DEFAULT')}>
        <IconButton
          aria-label="Close overlay"
          variant={sidebarOpen?'solid':'ghost'}
          colorScheme={sidebarOpen?'brand':'gray'}
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

      <HStack alignItems="flex-start" bgColor={useColorModeValue('gray.50', 'gray.DEFAULT')}>
        <IconCategoryDrawer
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories}
          data={data}
          setCategoryView={setCategoryView}
        />
        <Box flex={1} padding={5}>
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
