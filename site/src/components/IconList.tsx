import {Button, Box, chakra, useBreakpointValue, useToken} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {memo, useContext} from 'react';
import IconListItem from './IconListItem';
import {IconEntity} from '../types';
import {IconStyleContext} from "./CustomizeIconContext";
import {AutoSizer, Grid, WindowScroller} from 'react-virtualized';

interface IconListProps {
  icons: IconEntity[];
}

const IconList = memo(({icons}: IconListProps) => {
  const router = useRouter();
  const {color, setColor, size, setSize, strokeWidth, setStroke, resetStyle} = useContext(IconStyleContext);
  const styles = {
    '--lucide-stroke-color': color,
    '--lucide-stroke-width': strokeWidth,
    '--lucide-icon-size': size,
  };
  const columnCount = useBreakpointValue({base: 2, sm: 4, md: 6, lg: 8, xl: 10}, {ssr: false})

  const CellRenderer = ({isScrolling, isVisible, columnIndex, rowIndex, style}) => {
    let iconIndex = rowIndex * columnCount + columnIndex;
    if (iconIndex > icons.length - 1) {
      return null;
    }
    if (!isVisible || isScrolling) {
      return (
        <chakra.div style={style}
                    p={[1, 1.5, 2]}
        >
          <Button variant="iconListItem"
                  className={'icon-list-item'}
                  opacity={0.5}
          ></Button>
        </chakra.div>
      );
    }
    const icon = icons[iconIndex];
    if (!icon) {
      return null;
    }
    return (
      <chakra.div style={style}
           p={[1, 1.5, 2]}
      >
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
      </chakra.div>
    );
  };

  return (
    <Box
      maxW={useToken('sizes', 'container-max-width')} margin="auto"
      mx="auto"
      p={[1, 1.5, 2]}
      style={styles}
    >
      <WindowScroller>
        {({height, isScrolling, onChildScroll, scrollTop}) => (
          <AutoSizer disableHeight>
            {({width}) => (
              <Grid
                tabIndex={null}
                autoHeight
                height={height}
                width={width}
                scrollTop={scrollTop}
                cellRenderer={CellRenderer}
                columnCount={columnCount}
                rowHeight={80+16}
                columnWidth={80+16}
                rowCount={Math.ceil(icons.length / columnCount)}
                overscanRowCount={5}
                containerStyle={{margin: 'auto'}}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </Box>
  );
});

export default IconList;
