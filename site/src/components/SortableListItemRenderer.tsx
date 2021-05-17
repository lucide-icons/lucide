import { Flipped } from 'react-flip-toolkit';
import { Box } from "@chakra-ui/react";

import { ItemRendererProps, useDrag, useDrop, useIsClosestDragging } from 'react-sortly';
import IconListItem from './IconListItem';

const SortableListItemRenderer = (props: ItemRendererProps) => {
  const { id, depth, data: { icon } } = props;
  const [{ isDragging }, drag] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop();

  return (
    <Flipped flipId={id}>
    <Box ref={(ref) => drop(ref)}>
      <Box ref={drag}>
        <IconListItem
          icon={icon}
        />
      </Box>
    </Box>
    </Flipped>
  );
};

export default SortableListItemRenderer;
