import { Flipped } from 'react-flip-toolkit';
import { Box } from "@chakra-ui/react";

import { ItemRendererProps, useDrag, useDrop, useIsClosestDragging } from 'react-sortly';
import IconListItem from './IconListItem';
import { useEffect } from 'react';

const SortableListItemRenderer = (props: ItemRendererProps) => {
  const { id, data: icon } = props;
  const [{ isDragging }, drag] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop();

  if(!icon) {
    return null;
  }

  return (
    <Flipped flipId={id}>
      <Box
        ref={(ref) => drag(ref)}
        display="inline-block"
        width={176}
        height={146}
        position="relative"
        willChange="transform"
      >
        <IconListItem
          ref={drop}
          icon={icon}
          width={160}
          height={110}
          marginRight={4}
          marginBottom={4}
        />
      </Box>
    </Flipped>
  );
};

export default SortableListItemRenderer;
