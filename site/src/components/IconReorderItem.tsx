import { useState } from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import useRaisedShadow from '../hooks/useRaisedShadow';
import IconListItem from './IconListItem';
import { IconEntity } from '../types';
import { RefObject } from 'react';

interface Props {
  icon: IconEntity;
  dropZones?: RefObject<[string, HTMLDivElement][]>;
}

const IconReorderItem = ({ icon, dropZones }: Props): JSX.Element => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  // const [dragging, setDragging] = useState(false)

  const onDragEnd = (event, info) => {
    // console.log(dropZones.current, Array.from(event.path));

    const zone = dropZones.current?.find(([zone, el]) => {
      return Array.from(event.path).includes(el)
    })

    console.log(zone);

    // setDragging(false)
    // if(!dropZones) return;

    // const zoneBoundries = dropZones.current?.map(([zone, el]) => {
    //   if (!el) {
    //     return [];
    //   }
    //   // const { left, right, bottom, top } = el?.getBoundingClientRect();
    //   return [zone, el?.getBoundingClientRect()];
    // });

    // const [zone] = zoneBoundries.find(([, bounding]: [string, DOMRect]) => {
    //   const isInXBoundry =
    //     info.point.x > bounding?.left && info.point.x < bounding?.right;
    //   const isInYBoundry =
    //     info.point.y > bounding?.top && info.point.y < bounding?.bottom;
    //   return isInXBoundry && isInYBoundry;
    // });

    // if (zone) {
    //   // setActiveHalf(zone[0]);
    //   console.log(zone);

    // }

    // console.log(isInXBoundry);
  };

  // const onDrag = () => {
  //   setDragging(true)
  // }

  return (
    <Reorder.Item
      value={icon.name}
      style={{ boxShadow, y, listStyle: 'none' }}
      drag
      // Snap the box back to its center when we let go
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      // Allow full movememnt outside constraints
      dragElastic={1}
      onDragEnd={onDragEnd}
      // onDrag={onDrag}
      // className={dragging && 'dragging'}
      initial={false}
    >
      <IconListItem {...icon} />
    </Reorder.Item>
  );
};

export default IconReorderItem;
