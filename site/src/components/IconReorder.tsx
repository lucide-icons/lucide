import { Grid } from '@chakra-ui/react';
import { AnimatePresence, Reorder } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, RefObject } from 'react';
import { IconEntity } from '../types';
import IconListItem from './IconListItem';
import IconReorderItem from './IconReorderItem';

interface IconListProps {
  icons: IconEntity[];
  setIcons: (icons) => void;
  dropZones?: RefObject<[string, HTMLDivElement][]>;
}

const IconList = ({ icons, setIcons, dropZones }: IconListProps) => {
  return (
    <AnimatePresence>
      <Grid
        as={Reorder.Group}
        templateColumns={`repeat(auto-fill, minmax(80px, 1fr))`}
        gap={5}
        marginBottom={6}
        onReorder={setIcons}
        layoutScroll
        values={icons.map(({ name }) => name)}
        sx={{
          '.dragging': {
            position: 'absolute',
          },
        }}
      >
        {icons.map(icon => {
          return <IconReorderItem icon={icon} key={icon.name} dropZones={dropZones} />;
        })}
      </Grid>
    </AnimatePresence>
  );
};

export default memo(IconList, ({ icons: prevIcons }, { icons: nextIcons }) => {
  const prevIconsNames = prevIcons.map(({ name }) => name);
  const nextIconsNames = nextIcons.map(({ name }) => name);

  return JSON.stringify(prevIconsNames) === JSON.stringify(nextIconsNames);
});
