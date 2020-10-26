import { useContext, useState } from 'react';
import { IconStyleContext } from './CustomizeIconContext';
import { Edit } from 'lucide-react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Grid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/core';
import ColorPicker from './ColorPicker';

export function IconCustomizerDrawer() {
  const [showCustomize, setShowCustomize] = useState(false);
  const { color, setColor, size, setSize, strokeWidth, setStroke } = useContext(IconStyleContext);

  return (
    <>
      <Button as="a" leftIcon={<Edit />} size="lg" onClick={() => setShowCustomize(true)}>
        Customize
      </Button>
      <Drawer isOpen={showCustomize} placement="right" onClose={() => setShowCustomize(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Customize Icons</DrawerHeader>

          <DrawerBody>
            <Grid gridGap={'1em'}>
              <FormControl>
                <ColorPicker
                  color={color}
                  value={color}
                  onChangeComplete={(col) => setColor(col.hex)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="stroke">Stroke: {strokeWidth}px</FormLabel>
                <Slider
                  value={strokeWidth}
                  onChange={setStroke}
                  min={0.5}
                  max={3}
                  step={0.5}
                  name={'stroke'}
                >
                  <SliderTrack />
                  <SliderFilledTrack bg={color} />
                  <SliderThumb />
                </Slider>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="size">Size: {size}px</FormLabel>
                <Slider value={size} onChange={setSize} min={12} max={64} step={1} name={'size'}>
                  <SliderTrack />
                  <SliderFilledTrack bg={color} />
                  <SliderThumb />
                </Slider>
              </FormControl>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
