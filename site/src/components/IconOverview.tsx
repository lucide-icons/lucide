import { Box, Text, IconButton, HStack, useTheme } from '@chakra-ui/react';
import React, { useState } from 'react';
import useSearch from '../lib/useSearch';
import IconList from './IconList';
import { SearchInput } from './SearchInput';
import { IconEntity } from '../types';

import { SidebarClose, SidebarOpen } from 'lucide-react';

import categories from '../../../categories.json';
import IconCategoryList from './IconCategoryList';
import { IconCustomizerDrawer } from './IconCustomizerDrawer';
import { motion } from 'framer-motion';

interface IconOverviewProps {
  data: IconEntity[];
}

const IconOverview = ({ data }: IconOverviewProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const theme = useTheme()

  const [categoryView, setCategoryView] = useState(true);
  const SidebarIcon = categoryView ? SidebarOpen : SidebarClose;

  const searchResults = useSearch(query, data, [
    { name: 'name', weight: 2 },
    { name: 'tags', weight: 1 },
  ]);

  const sidebarVariants = {
    closed: {
      width: 0,
    },
    open: {
      width: theme.sizes['xs']
    }
  }

  return (
    <Box>
      <HStack position="sticky" top={0} zIndex={1} gap={2} padding={5}>
        <IconButton
          aria-label="Close overlay"
          variant="solid"
          color="current"
          onClick={() => setCategoryView(currentView => !currentView)}
          icon={<SidebarIcon />}
        />
        <SearchInput onChange={setQuery} count={data.length} />
        <IconCustomizerDrawer size="md" paddingX={6} />
      </HStack>

      <HStack marginTop={5} marginBottom="320px" padding={5} alignItems="flex-start">
        <motion.div variants={sidebarVariants} animate={categoryView ? 'open' : 'closed'}>
          <Box bgColor="blue.400" w="full" overflow="hidden">
            <Box whiteSpace="nowrap">
              hello
            </Box>
          </Box>
        </motion.div>
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
    </Box>
  );
};

export default IconOverview;
