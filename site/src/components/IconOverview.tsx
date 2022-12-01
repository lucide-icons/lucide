import {Box, Flex, Hide, IconButton, Text, Tooltip, useColorMode, useToken, useBreakpointValue} from '@chakra-ui/react';
import React, {useContext, useState} from 'react';
import useSearch from '../lib/useSearch';
import {Sliders as SlidersIcon} from 'lucide-react';
import IconList from './IconList';
import {SearchInput} from './SearchInput';
import {CategoryEntity, IconEntity} from '../types';
import theme from "../lib/theme";
import {IconCustomizerDrawer} from "./IconCustomizerDrawer";
import useSpacing from "../lib/useSpacing";
import {IconStyleContext} from "./CustomizeIconContext";

interface IconOverviewProps {
  data: IconEntity[];
  categories: CategoryEntity[];
  currentIcon?: IconEntity;
  currentVersion: string;
}

const IconOverview = ({data, categories, currentIcon, currentVersion}: IconOverviewProps) => {
  const [query, setQuery] = useState('');
  const {colorMode} = useColorMode();
  const isMobile = useBreakpointValue({base: true, md: false});
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const {category, setCategory} = useContext(IconStyleContext);

  const searchResults = useSearch(query, data, [
    {name: 'name', weight: 2},
    {name: 'tags', weight: 1},
  ]).filter((icon) => (category === null || icon.categories.includes(category)));

  return (
    <>
      <Box
        bg={colorMode === 'dark' ? 'darkgray.DEFAULT' : 'white'}
        position="sticky"
        top={0}
        zIndex={1}
        w="full"
      >
        <Box
          p={useSpacing('container')}
          maxW={useToken('sizes', 'container-max-width')}
          w="full"
          m="auto"
        >
          <Flex direction="row"
                justifyContent="center"
                gap={2}
                alignItems="center"
                margin="auto"
          >
            <SearchInput onChange={setQuery}
                         flexGrow={1}
                         placeholder={isMobile ? `Search ${data.length} icons...` : 'Search icons...'}
            />
            <Hide above="md">
              <Tooltip label="Customize icons">
                <IconButton
                  active={customizerOpen ? 'active' : undefined}
                  onClick={() => setCustomizerOpen(!customizerOpen)}
                  icon={<SlidersIcon/>}
                  aria-label="Customize icons"
                />
              </Tooltip>
            </Hide>
          </Flex>
          {customizerOpen||!isMobile ? (<IconCustomizerDrawer {...{data, categories}}/>) : null}
        </Box>
      </Box>

      <Box bg={colorMode == 'light' ? theme.colors.gray[50] : theme.colors.gray.DEFAULT} flexGrow={1}>
        {searchResults.length > 0 ? (
          <Box
            mx="auto"
            p={useSpacing('container')}
          >
            <IconList icons={searchResults} currentIcon={currentIcon} currentVersion={currentVersion}/>
          </Box>
        ) : (
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" wordBreak="break-word" p={4}>
            No results found for "{query}"
          </Text>
        )}
      </Box>
    </>
  );
};

export default IconOverview;
