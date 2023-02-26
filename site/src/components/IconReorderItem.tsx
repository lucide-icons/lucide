import { useState } from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import useRaisedShadow from '../hooks/useRaisedShadow';
import IconListItem from './IconListItem';
import { IconEntity } from '../types';
import { RefObject } from 'react';

interface Props {
  icon: IconEntity
  dropZones?: RefObject<[string, HTMLDivElement][]>
  onDrop?: (name:string, category: string) => void
  dragging: boolean;
  setDragging: (dragging) => void;
}

const IconReorderItem = ({ icon, dropZones, onDrop, setDragging }: Props): JSX.Element => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const [dragItem, setDragItem] = useState(false);

  const onDragEnd = (event) => {
    setDragItem(false)
    setDragging(false);

    const dropZone = dropZones.current?.find(([, el]) => {
      if (!Array.isArray(event?.path)) {
        return false
      }

      return Array.from(event.path).includes(el)
    })

    if (dropZone?.[0] && onDrop) {
      const category = dropZone?.[0]
      console.log(icon.name, category);

      onDrop(icon.name, category)
    }
  };

  const onDrag = () => {
    setDragItem(true)
    setDragging(true);
  };

  return (
    <Reorder.Item
      value={icon.name}
      style={{
        boxShadow, y,
        listStyle: 'none',
        pointerEvents: dragItem ? 'none' : 'all',
        cursor: dragItem ? 'grab': 'pointer',
      }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={onDragEnd}
      onDrag={onDrag}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.2,
          delay: 0.02,
        },
      }}
    >
      <IconListItem {...icon} />
    </Reorder.Item>
  );
};

export default IconReorderItem;
