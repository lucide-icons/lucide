import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Category, IconEntity } from 'src/types';
import theme from '../lib/theme';
import IconReorder from './IconReorder';

const UnCategorizedIcons = ({
  icons,
  dropZones,
  dragging,
  setDragging,
  categories,
  handleChange,
}): JSX.Element => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const boxBackground = useColorModeValue(theme.colors.white, theme.colors.gray[700]);
  const allIconContainerRef = useRef(null);
  const unCategorizedIcons = useMemo(() => {
    return (icons as IconEntity[]).filter(icon => {
      return !Object.values(categories as Category[])
        .flat()
        .some(categorizedIcon => categorizedIcon.name === icon.name);
    });
  }, [icons, categories]);

  const onItemDrop = useCallback(
    (iconName: string, targetCategory: string) => {
      const newIcons = [...categories[targetCategory].map(({ name }) => name), iconName];

      handleChange(targetCategory)(newIcons);
    },
    [categories],
  );

  useEffect(() => {
    allIconContainerRef.current.addEventListener('scroll', () => {
      setScrollPosition(allIconContainerRef.current.scrollTop);
    });
  }, []);

  return (
    <Box paddingTop={0} position="sticky" top="0">
      <Box
        marginTop={5}
        marginBottom={320}
        maxWidth="calc(1600px / 2)"
        width="100%"
        height="calc(100vh)"
        borderWidth="1px"
        boxSizing="border-box"
        rounded="lg"
        boxShadow={theme.shadows.xl}
        bg={boxBackground}
        padding={8}
        overflowY={dragging ? 'visible' : 'auto'}
        ref={allIconContainerRef}
        as={motion.div}
        layoutScroll
      >
        <Box marginTop={dragging ? scrollPosition * -1 : undefined}>
          <Heading as="h5" size="sm" marginBottom={4}>
            Uncategorized Icons
          </Heading>
          <IconReorder
            // key={`uncatogorized-${newKey}`}
            icons={unCategorizedIcons}
            dropZones={dropZones}
            onDrop={onItemDrop}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setIcons={() => {}}
            dragging={dragging}
            setDragging={setDragging}
          />

          <Heading as="h5" size="sm" marginBottom={4}>
            All Icons
          </Heading>
          <IconReorder
            icons={Object.values(icons)}
            dropZones={dropZones}
            onDrop={onItemDrop}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setIcons={() => {}}
            dragging={dragging}
            setDragging={setDragging}
            sx={{
              opacity: 0.4,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UnCategorizedIcons;
