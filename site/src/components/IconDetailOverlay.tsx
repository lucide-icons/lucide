import {Box, Flex, Slide, useColorMode} from '@chakra-ui/react';
import theme from '../lib/theme';
import {memo} from 'react';
import {Category} from '../types';
import IconDetail from "./IconDetail";
import {
  useIconDetailOverlayGetContext,
  useIconDetailOverlaySetContext
} from "./IconDetailOverlayContext";
import {useKeyBindings} from "../lib/key";

type IconDownload = {
  src: string;
  name: string;
};

interface IconDetailOverlayProps {
  categories?: Category[]
}

const IconDetailOverlay = memo(({categories = []}: IconDetailOverlayProps) => {
  const {colorMode} = useColorMode();
  const {icon, isOpen} = useIconDetailOverlayGetContext();
  const {onClose} = useIconDetailOverlaySetContext();

  const close = () => {
    onClose();
  };

  useKeyBindings({
    Escape: {
      fn: () => onClose(),
    },
  });

  return (
    <Box
      position="fixed"
      bottom={0}
      zIndex={2}
      width="100%"
      left={0}
      height={0}
    >
      <Slide direction="bottom" in={isOpen && !!icon}
             style={{zIndex: 10, pointerEvents: 'none', margin: '0 auto'}}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW={theme.semanticTokens.sizes['container-max-width']}
          w="full"
          p={theme.spacing.container}
          style={{pointerEvents: 'initial'}}
          margin="auto"
        >
          <Box
            rounded="lg"
            border="none"
            width="full"
            boxShadow={theme.shadows['dark-lg']}
            position="relative"
            bg={
              colorMode == "light"
                ? theme.colors.white
                : theme.colors.black
            }
            padding={4}
          >
            {icon &&
              <IconDetail showFullscreen={true} icon={icon} categories={categories} close={close}/>}
          </Box>
        </Flex>
      </Slide>
    </Box>
  );
});

export default IconDetailOverlay;
