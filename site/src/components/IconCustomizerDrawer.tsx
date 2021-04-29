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
  Flex,
  Text,
} from '@chakra-ui/react';
import ColorPicker from './ColorPicker';

export function IconCustomizerDrawer() {
  const [showCustomize, setShowCustomize] = useState(false);
  const { color, setColor, size, setSize, strokeWidth, setStroke, resetStyle } = useContext(IconStyleContext);

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
                <FormLabel htmlFor="stroke">
                  <Flex>
                    <Text flexGrow={1} fontWeight={'bold'}>
                      Stroke
                    </Text>
                    <Text>{strokeWidth}px</Text>
                  </Flex>
                </FormLabel>
                <Slider
                  value={strokeWidth}
                  onChange={setStroke}
                  min={0.5}
                  max={3}
                  step={0.5}
                  name={'stroke'}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg={color} />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="size">
                  <Flex>
                    <Text flexGrow={1} fontWeight={'bold'}>
                      Size
                    </Text>
                    <Text>{size}px</Text>
                  </Flex>
                </FormLabel>
                <Slider value={size} onChange={setSize} min={12} max={64} step={1} name={'size'}>
                  <SliderTrack>
                    <SliderFilledTrack bg={color} />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
              <FormControl>
                <Button onClick={resetStyle}>Reset</Button>
              </FormControl>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
