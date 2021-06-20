
import React from 'react';
import { useDrop } from 'react-dnd';

import Sortly, { ItemData, DragObject } from 'react-sortly';
import SortableListItemRenderer from './SortableListItemRenderer';
import { Grid } from "@chakra-ui/react";

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
    accept: 'TREE',
    collect: (monitor) => ({
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
  }

  React.useEffect(() => {
    if (dragItem) {
      handleMove();
    }
  }, [dragItem, hovered, handleMove]);

  return (
    <div ref={drop} style={{ paddingBottom: 50 }}>
      <Sortly<Item>
        type="TREE"
        items={items}
        onChange={onChange}
      >
        {SortableListItemRenderer}
      </Sortly>
    </div>
  );
};

export default React.memo(SortableIconList, (oldProps, newProps) => {
  const createName = (items) => items.map(({name}) => name).join('.');

  return createName(oldProps.items) === createName(newProps.items);
});
