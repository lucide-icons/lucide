import {useContext, useState} from 'react';
import {IconStyleContext} from './CustomizeIconContext';
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Hide,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VisuallyHidden,
} from '@chakra-ui/react';
import ColorPicker from './ColorPicker';
import {
  ChevronDown as ChevronDownIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon
} from 'lucide-react';
import {CategoryEntity, IconEntity} from "../types";
import download from 'downloadjs';
import {IconWrapper} from "./IconWrapper";

interface IconCustomizerDrawerProps {
  data: IconEntity[];
  categories: CategoryEntity[];
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

export function IconCustomizerDrawer({data, categories}: IconCustomizerDrawerProps) {
  const {
    color,
    setColor,
    size,
    setSize,
    strokeWidth,
    setStroke,
    category,
    setCategory,
    resetStyle,
  } = useContext(IconStyleContext);
  const [zippingIcons, setZippingIcons] = useState(false);
  const breakpoint = 'md';

  const currentCategory = category ? categories.find((item) => category === item.name) : null;
  const currentCategoryIcon = currentCategory ? data.find((item) => currentCategory.icon === item.name) : null;

  const customizeIcon = (src) => src
    .replace(/ stroke="currentColor"/, ` stroke="${color}"`)
    .replace(/ stroke-width="[^"]+"/, ` stroke-width="${strokeWidth}"`)
    .replace(/ width="[^"]+"/, ` width="${size}"`)
    .replace(/ height="[^"]+"/, ` height="${size}"`)

  const downloadAllIcons = async () => {
    if (!zippingIcons) {
      setZippingIcons(true);
      const iconEntries: IconContent[] = data.map(icon => [icon.name, customizeIcon(icon.src)]);

      const specifier = (size !== 24 ? `_${size}x${size}` : '')
        + (color !== 'currentColor' ? '_' + color.replace('#', '') : '')
        + (strokeWidth !== 2 ? '_' + strokeWidth + 'px' : '')
      const zip = await generateZip(iconEntries);
      download(zip, `lucide${specifier}.zip`);
      setZippingIcons(false);
    }
  };

  return (
    <Flex direction={{base: 'column', [breakpoint]: 'row'}}
          mt={{base: 4, [breakpoint]: 6}}
          justifyContent={{base: 'flex-start', [breakpoint]: 'center'}}
          alignItems={{base: 'flex-start', [breakpoint]: 'center'}}
          w="100%"
    >
      <Hide below={'lg'}>
        <Box textTransform="uppercase" whiteSpace="nowrap">
          <strong>{data.length}</strong> icons
        </Box>
        <Divider orientation="vertical" mx={3} height={5}/>
      </Hide>
      <Flex direction={{base: 'column', [breakpoint]: 'row'}}
            justifyContent={{base: 'flex-start', [breakpoint]: 'center'}}
            alignItems={{base: 'flex-start', [breakpoint]: 'center'}}
            w="100%"
      >
        <Menu>
          <MenuButton
            transition='all 0.2s'
            as={Button}
            variant="ghost"
            container={{
              display: 'flex',
              direction: 'row',
            }}
            flexDirection="row"
            leftIcon={currentCategoryIcon ? (
              <IconWrapper display="inline-block" src={currentCategoryIcon.src}/>) : null}
            rightIcon={(<ChevronDownIcon/>)}
          >
            <VisuallyHidden>Category</VisuallyHidden>
            {currentCategory ? currentCategory.title : 'All icons'}
          </MenuButton>
          <Portal>
            <MenuList hasArrow zIndex="dropdown" maxHeight={60} overflowY={"scroll"}
                      className="custom-scrollbar"
            >
              <MenuItem
                color={category === null ? 'brand.500' : null}
                onClick={() => setCategory(null)}
              >All icons</MenuItem>
              {categories.map((categoryItem) => {
                const categoryIcon = data.find((item) => item.name === categoryItem.icon);
                return (
                  <MenuItem
                    command={(
                      <chakra.span fontSize=".75rem" ml={2}>{categoryItem.icons?.length}</chakra.span>)}
                    color={category === categoryItem.name ? 'brand.500' : null}
                    onClick={() => setCategory(categoryItem.name)}
                    icon={(
                      <IconWrapper src={categoryIcon.src}/>
                    )}
                  >{categoryItem.title}</MenuItem>
                )
              })}
            </MenuList>
          </Portal>
        </Menu>
        <Divider display={{base: 'none', [breakpoint]: 'block'}} orientation="vertical" mx={3}
                 height={5}/>
        <FormControl display="flex" direction="row" w="auto">
          <ColorPicker
            color={color}
            value={color}
            onChangeComplete={(col) => setColor(col.hex)}
          />
        </FormControl>
        <Divider display={{base: 'none', [breakpoint]: 'block'}} orientation="vertical" mx={3}
                 height={5}/>
        <FormControl display="flex" direction="row" w="auto" px={{base: 4, [breakpoint]: 0}}
                     py={{base: 2, [breakpoint]: 0}}>
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
        <Divider display={{base: 'none', [breakpoint]: 'block'}} orientation="vertical" mx={3}
                 height={5}/>
        <FormControl display="flex" direction="row" w="auto" px={{base: 4, [breakpoint]: 0}}
                     py={{base: 2, [breakpoint]: 0}}>
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
        <Divider display={{base: 'none', [breakpoint]: 'block'}} orientation="vertical" mx={3}
                 height={5}/>
        <ButtonGroup px={{base: 3, [breakpoint]: 0}}>
          <Tooltip hasArrow label="Reset">
            <IconButton size="sm"
                        variant="ghost"
                        onClick={resetStyle}
                        icon={(<DeleteIcon size={16}/>)}
                        aria-label="Reset"
            />
          </Tooltip>
          <Tooltip hasArrow label="Download all">
            <IconButton size="sm"
                        variant="ghost"
                        onClick={downloadAllIcons}
                        icon={(<DownloadIcon size={16}/>)}
                        aria-label="Download all"
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
