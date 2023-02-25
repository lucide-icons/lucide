import { Box, Text, IconButton, HStack, useTheme, Button } from '@chakra-ui/react';
import React, { memo, useMemo, useState } from 'react';
import useSearch from '../lib/useSearch';
import IconList from './IconList';
import { SearchInput } from './SearchInput';
import { Category, IconEntity } from '../types';

import { SidebarClose, SidebarOpen } from 'lucide-react';

import IconCategoryList from './IconCategoryList';
import { IconCustomizerDrawer } from './IconCustomizerDrawer';
import { motion } from 'framer-motion';

interface IconOverviewProps {
  data: IconEntity[];
  categories: Category[]
}

const CATEGORY_TOP_OFFSET = 100

const IconOverview = ({ data, categories }: IconOverviewProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const theme = useTheme()

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categoryView, setCategoryView] = useState(true);
  const SidebarIcon = sidebarOpen ? SidebarOpen : SidebarClose;

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

  const categoryList = useMemo(() => {
    return (
      <>
        {[{ name: 'all', title: 'All' }, ...categories].map(({ title, name }) => {
          // Show category icon?
          // const icon = data.find(({ name: iconName }) => iconName === categoryIcon)
          // const Icon = createLucideIcon(icon.name, icon.iconNode)

          return (
            <Button
              as="a"
              key={name}
              colorScheme='gray'
              variant='ghost'
              width="100%"
              justifyContent="flex-start"
              onClick={() => {
                setCategoryView(name !== 'all')
              }}
              href={`#${name}`}
              marginBottom={1}
              // className={hash === name ? 'active' : undefined}
              sx={{
                flexShrink: 0,
                '&.active': {
                  color: 'brand.500'
                }
              }}
            >
              {title}
            </Button>
          )
        })}
        <Box h={20} flexShrink={0}></Box>
      </>
    )
  }, [categories])

  return (
    <Box>
      <HStack position="sticky" top={0} zIndex={1} gap={2} padding={5}>
        <IconButton
          aria-label="Close overlay"
          variant="solid"
          color="current"
          onClick={() => setSidebarOpen(currentView => !currentView)}
          icon={<SidebarIcon />}
        />
        <SearchInput onChange={setQuery} count={data.length} />
        <IconCustomizerDrawer size="md" paddingX={6} />
      </HStack>

      <HStack marginBottom="320px" padding={5} alignItems="flex-start">
        <motion.div
          variants={sidebarVariants}
          animate={sidebarOpen ? 'open' : 'closed'}
          initial={false}
          style={{
            height: `calc(100vh - ${CATEGORY_TOP_OFFSET}px)`,
            position: 'sticky',
            top: '100px'
          }}
        >
          <Box
            w="full"
            h="full"
            overflowY="auto"
            sx={{
              '&::-webkit-scrollbar' : {
                width: '4px',
              },
              '&::-webkit-scrollbar-track' : {
                background: 'transparent'
              },
              '&::-webkit-scrollbar-thumb' : {
                bgColor: 'grey',
                borderRadius: 0,
              },
            }}
          >
            <Box
              whiteSpace="nowrap"
              height="100%"
              display="flex"
              flexDirection="column"
              paddingBottom={8}
              paddingX={2}
              paddingY={1}
              paddingRight={4}
            >
              {categoryList}
            </Box>
          </Box>
        </motion.div>
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
