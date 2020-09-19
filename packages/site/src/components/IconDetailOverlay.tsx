import {useSpring, animated} from 'react-spring'
import { Box, Text, CloseButton } from "@chakra-ui/core";
import { useEffect } from 'react';

const IconDetailOverlay = ({ isOpen = true, onClose, icon }) => {
  const [animation, setAnimation] = useSpring(() => ({opacity: 1, from: {opacity: 0}}))

  const handleClose = () => {
    onClose();
  }

  useEffect(() => {
    setAnimation({opacity: isOpen ? 1 : 0})
  });
  
  return (
    <Box position="fixed" bottom={2} zIndex={1}>
      <animated.div style={animation}>
        <Box>
          <CloseButton onClick={handleClose}/>
          <Text fontSize="4xl">Featherity</Text>
        </Box>
      </animated.div>
    </Box>
  );
};

export default IconDetailOverlay;
