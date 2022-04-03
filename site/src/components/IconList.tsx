import { Grid } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { IconEntity } from '../types';
import IconListItem from './IconListItem';

interface IconListProps {
  icons: IconEntity[];
}

const IconList = memo(({ icons }: IconListProps) => {
  const router = useRouter();

  return (
    <Grid templateColumns={`repeat(auto-fill, minmax(80px, 1fr))`} gap={5} marginBottom={6}>
      {icons.map(icon => {
        return (
          <Link
            key={icon.name}
            scroll={false}
            shallow={true}
            href={{
              pathname: '/icon/[iconName]',
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
