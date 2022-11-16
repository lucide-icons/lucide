import {useContext, useState} from 'react';
import {IconStyleContext} from './CustomizeIconContext';
import {
  Box,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import ColorPicker from './ColorPicker';
import {Delete as DeleteIcon, Download as DownloadIcon} from 'lucide-react';
import {IconEntity} from "../types";
import download from 'downloadjs';

interface IconCustomizerDrawerProps {
  data: IconEntity[]
}

type IconContent = [icon: string, src: string];

async function generateZip(icons: IconContent[]) {
  const JSZip = (await import('jszip')).default

  const zip = new JSZip();

  const addingZipPromises = icons.map(([name, src]) =>
    zip.file(`${name}.svg`, src),
  );

  await Promise.all(addingZipPromises)

  return zip.generateAsync({type: 'blob'});
}

export function IconCustomizerDrawer({data}: IconCustomizerDrawerProps) {
  const {color, setColor, size, setSize, strokeWidth, setStroke, resetStyle} = useContext(IconStyleContext);
  const [zippingIcons, setZippingIcons] = useState(false);

  const customizeIcon = (src) => src
    .replace(/ stroke="currentColor"/, ` stroke="${color}"`)
    .replace(/ stroke-width="[^"]+"/, ` stroke-width="${strokeWidth}"`)
    .replace(/ width="[^"]+"/, ` width="${size}"`)
    .replace(/ height="[^"]+"/, ` height="${size}"`)

  const downloadAllIcons = async () => {
    setZippingIcons(true);
    let iconEntries: IconContent[] = data.map(icon => [icon.name, customizeIcon(icon.src)]);

    const specifier = (size !== 24 ? `_${size}x${size}` : '')
      + (color !== 'currentColor' ? '_' + color.replace('#', '') : '')
      + (strokeWidth !== '2' ? '_' + strokeWidth + 'px' : '')
    const zip = await generateZip(iconEntries);
    download(zip, `lucide${specifier}.zip`);
    setZippingIcons(false);
  };

  return (
    <Flex direction={{base: 'column', md: 'row'}}
          mt={{base: 4, md: 6}}
          justifyContent={{base: 'flex-start', md: 'center'}}
          alignItems={{base: 'flex-start', md: 'center'}}
          w="100%"
    >
      <Box textTransform="uppercase" whiteSpace="nowrap">
        <strong>{data.length}</strong> icons
      </Box>
      <Divider display={{base: 'none', md: 'block'}} orientation="vertical" mx={3} height={5} />
      <Divider display={{base: 'block', md: 'none'}} orientation="horizontal" my={3} width="full" />
      <Flex direction={{base: 'column', sm: 'row'}}
            justifyContent={{base: 'flex-start', sm: 'center'}}
            alignItems={{base: 'flex-start', sm: 'center'}}
            w="100%"
      >
        <FormControl display="flex" direction="row" w="auto">
          <ColorPicker
            color={color}
            value={color}
            onChangeComplete={(col) => setColor(col.hex)}
          />
        </FormControl>
        <Divider display={{base: 'none', sm: 'block'}} orientation="vertical" mx={3} height={5} />
        <FormControl display="flex" direction="row" w="auto">
          <FormLabel htmlFor="stroke" mb={0}>
            <Flex>
              <Text flexGrow={1} fontWeight={'bold'}>
                Stroke
              </Text>
            </Flex>
          </FormLabel>
          <Slider
            value={strokeWidth}
            colorScheme="brand"
            onChange={setStroke}
            min={0.5}
            max={3}
            step={0.5}
            name={'stroke'}
            w="4rem"
          >
            <SliderTrack>
              <SliderFilledTrack bg={'brand.500'}/>
            </SliderTrack>
            <SliderThumb/>
          </Slider>
          <Text ml={4}>{strokeWidth}px</Text>
        </FormControl>
        <Divider display={{base: 'none', sm: 'block'}} orientation="vertical" mx={3} height={5} />
        <FormControl display="flex" direction="row" w="auto">
          <FormLabel htmlFor="size" mb={0}>
            <Flex>
              <Text flexGrow={1} fontWeight={'bold'}>
                Size
              </Text>
            </Flex>
          </FormLabel>
          <Slider
            value={size}
            colorScheme="brand"
            onChange={setSize}
            min={12}
            max={64}
            step={4}
            name={'size'}
            w="4rem"
          >
            <SliderTrack>
              <SliderFilledTrack bg={'brand.500'}/>
            </SliderTrack>
            <SliderThumb/>
          </Slider>
          <Text ml={4}>{size}px</Text>
        </FormControl>
        <Divider display={{base: 'none', sm: 'block'}} orientation="vertical" mx={3} height={5} />
        <ButtonGroup>
          <Tooltip hasArrow label="Reset" aria-label="Reset">
            <IconButton size="sm"
                        variant="ghost"
                        onClick={resetStyle}
                        icon={(<DeleteIcon size={16}/>)}
            >Reset</IconButton>
          </Tooltip>
          <Tooltip hasArrow label="Download all" aria-label="Download all">
            <IconButton size="sm"
                        variant="ghost"
                        onClick={downloadAllIcons}
                        icon={(<DownloadIcon size={16}/>)}
            ></IconButton>
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
