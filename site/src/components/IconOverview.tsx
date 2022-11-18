import {Box, Flex, Hide, IconButton, Text, Tooltip, useColorMode, useToken} from '@chakra-ui/react';
import React, {useState} from 'react';
import useSearch from '../lib/useSearch';
import {Sliders as SlidersIcon} from 'lucide-react';
import IconList from './IconList';
import {SearchInput} from './SearchInput';
import {IconEntity} from '../types';
import theme from "../lib/theme";
import {IconCustomizerDrawer} from "./IconCustomizerDrawer";
import useSpacing from "../lib/useSpacing";

interface IconOverviewProps {
  data: IconEntity[];
  currentIcon?: IconEntity;
}

const IconOverview = ({data, currentIcon}: IconOverviewProps) => {
  const [query, setQuery] = useState('');
  const {colorMode} = useColorMode();
  const [customizerOpen, setCustomizerOpen] = useState(true);

  const searchResults = useSearch(query, data, [
    {name: 'name', weight: 2},
    {name: 'tags', weight: 1},
  ]);

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
            <SearchInput onChange={setQuery} count={data.length} grow={1}/>
            <Hide above="md">
              <Tooltip label="Customize icons" aria-label="Customize icons">
                <IconButton
                  active={customizerOpen}
                  onClick={() => setCustomizerOpen(!customizerOpen)}
                  icon={<SlidersIcon/>}
                ></IconButton>
              </Tooltip>
            </Hide>
          </Flex>
          {customizerOpen ? (<IconCustomizerDrawer data={data}/>) : null}
        </Box>
      </Box>

      <Box bg={colorMode == 'light' ? theme.colors.gray[50] : theme.colors.gray.DEFAULT}>
        {searchResults.length > 0 ? (
          <Box
            mx="auto"
            p={useSpacing('container')}
          >
            <IconList icons={searchResults}/>
          </Box>
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
