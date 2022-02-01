import React from 'react';
import { useDrop } from 'react-dnd';

import Sortly, { ItemData, DragObject } from 'react-sortly';
import SortableListItemRenderer from './SortableListItemRenderer';
import { Grid } from '@chakra-ui/react';

type TreeProps = {
  id: number;
  items: ItemData<Item>[];
  onChange: (items: ItemData<Item>[]) => void;
  onEnter: (item: DragObject) => void;
};

type Item = {
  id: number;
  name: string;
};

const SortableIconList = ({ items, onChange, onEnter }: TreeProps) => {
  const [{ hovered, dragItem }, drop] = useDrop({
    accept: 'ICONS',
    collect: monitor => ({
      hovered: monitor.isOver(),
      dragItem: monitor.getItem(),
    }),
  });

  const handleMove = () => {
    if (!dragItem) {
      return;
    }

    if (hovered) {
      onEnter(dragItem);
    }
  };

  React.useEffect(() => {
    if (dragItem) {
      handleMove();
    }
  }, [dragItem, hovered, handleMove]);

  return (
    <Grid templateColumns={`repeat(auto-fill, minmax(150px, 1fr))`} gap={5} ref={drop}>
      <Sortly<Item> maxDepth={0} horizontal items={items} onChange={onChange} type="ICONS">
        {props => <SortableListItemRenderer {...props} />}
      </Sortly>
    </Grid>
  );
};

export default SortableIconList;
