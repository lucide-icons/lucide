import {useContext} from 'react';
import {IconStyleContext} from "./CustomizeIconContext";

const IconStyleElement = () => {
  const {color, setColor, size, setSize, strokeWidth, setStroke, resetStyle} = useContext(IconStyleContext);
  const styles = {
    '--lucide-stroke-color': color,
    '--lucide-stroke-width': strokeWidth,
    '--lucide-icon-size': size,
  };
  return (
    <>
      <style __css={styles}>

      </style>
    </>
  );
};

export default IconStyleElement;
