import { Grid, useToken } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useContext } from 'react';
import IconListItem from './IconListItem';
import { IconEntity } from '../types';
import {IconStyleContext} from "./CustomizeIconContext";

interface IconListProps {
  icons: IconEntity[];
}

const IconList = memo(({ icons }: IconListProps) => {
  const router = useRouter();
  const {color, setColor, size, setSize, strokeWidth, setStroke, resetStyle} = useContext(IconStyleContext);
  const styles = {
    '--lucide-stroke-color': color,
    '--lucide-stroke-width': strokeWidth,
    '--lucide-icon-size': size,
  };

  return (
    <Grid templateColumns={`repeat(auto-fill, minmax(80px, 1fr))`} gap={[2, 3, 4]} p={[2, 3, 4]}
          maxW={useToken('sizes', 'container-max-width')} margin="auto"
          style={styles}
    >
      {icons.map(icon => {
        return (
          <Link
            key={icon.name}
            scroll={false}
            shallow={true}
            href={{
              pathname: '/icons/[iconName]',
              query: {
                ...router.query,
                iconName: icon.name,
              },
            }}
          >
            <IconListItem {...icon} />
          </Link>
        );
      })}
    </Grid>
  );
});

export default IconList;
