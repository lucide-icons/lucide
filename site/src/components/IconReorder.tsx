import { Box, BoxProps } from '@chakra-ui/react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { memo, RefObject } from 'react';
import { IconEntity } from '../types';
import IconReorderItem from './IconReorderItem';

interface IconListProps {
  icons: IconEntity[];
  setIcons: (icons) => void;
  dropZones?: RefObject<[string, HTMLDivElement][]>;
  onDrop?: (name: string, category: string) => void;
  dragging: boolean;
  setDragging: (dragging) => void;
  sx?: BoxProps['sx'];
}

const IconReorder = ({
  icons,
  setIcons,
  dropZones,
  onDrop,
  dragging,
  setDragging,
  sx,
}: IconListProps) => {
  return (
    <Box
      as={Reorder.Group}
      display="flex"
      flexWrap="wrap"
      gap={5}
      marginBottom={6}
      onReorder={setIcons}
      layoutScroll
      values={icons.map(({ name }) => name)}
      sx={{
        '.dragging': {
          position: 'absolute',
        },
        ...sx,
      }}
    >
      <AnimatePresence>
        {icons.map(icon => {
          return (
            <IconReorderItem
              icon={icon}
              key={icon.name}
              dropZones={dropZones}
              onDrop={onDrop}
              dragging={dragging}
              setDragging={setDragging}
            />
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

export default memo(IconReorder, (prevProps, nextProps) => {
  const prevIconsNames = prevProps.icons.map(({ name }) => name);
  const nextIconsNames = nextProps.icons.map(({ name }) => name);

  return JSON.stringify(prevIconsNames) === JSON.stringify(nextIconsNames);
});
