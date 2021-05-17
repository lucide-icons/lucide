
import React from 'react';
import { useDrop } from 'react-dnd';

import Sortly, { ItemData, DragObject } from 'react-sortly';
import SortableListItemRenderer from './SortableListItemRenderer';

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

  const handleMove = React.useCallback(() => {
    if (!dragItem) {
      return;
    }

    if (hovered) {
      onEnter(dragItem);
    }
  }, [dragItem, hovered, onEnter]);

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

export default SortableIconList;
