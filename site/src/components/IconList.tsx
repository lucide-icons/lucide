import { Grid } from '@chakra-ui/react';
import IconListItem from './IconListItem';
import { IconEntity } from '../types';

interface IconListProps {
  icons: IconEntity[];
  category?: string
}

const IconList = ({ icons, category }: IconListProps) => {
  return (
    <Grid templateColumns={`repeat(auto-fill, minmax(80px, 1fr))`} gap={5} marginBottom={6}
          justifyItems={'center'}
          alignItems={'center'}
    >
      {icons.map(icon => {
        return (
          <IconListItem icon={icon} key={`${category??'all'}-${icon.name}`} />
        );
      })}
    </Grid>
  );
};

export default IconList;
