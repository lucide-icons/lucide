import {
  Box,
  BoxProps,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
  useMultiStyleConfig,
  VisuallyHidden
} from '@chakra-ui/react';
import {Expand as ExpandIcon, Palette as PaletteIcon, Scale as ScaleIcon} from 'lucide-react';
import {useMemo, useState} from 'react';
import {IconEntity} from "../types";
import {IconWrapper} from "./IconWrapper";

interface IconCustomizerWidgetProps extends BoxProps {
  icons: IconEntity[];
}

interface IconCustomizerProperty<T> {
  name: string,
  icon: any,
  label: string,
  set: (value: T) => void,
  value: T,
  options: {
    value: T,
    label: string,
  }[]
}

const IconCustomizerWidget = ({icons, ...rest}: IconCustomizerWidgetProps) => {
  const styles = useMultiStyleConfig('IconCustomizerWidget')

  const [selectedIcon, setIcon] = useState(icons[0].name);
  const [selectedColor, setColor] = useState('brand');
  const [selectedSize, setSize] = useState(24);
  const [selectedWeight, setWeight] = useState(2);
  const [selectedProperty, setProperty] = useState('size');

  const sizeMultiplier = 3;

  const customizationOptions: IconCustomizerProperty<number | string>[] = [
    {
      name: 'size',
      icon: <ExpandIcon/>,
      label: 'Size',
      set: setSize,
      value: selectedSize,
      options: [
        {
          value: 12,
          label: 'Extra small',
        },
        {
          value: 16,
          label: 'Small',
        },
        {
          value: 24,
          label: 'Medium',
        },
        {
          value: 48,
          label: 'Large',
        },
        {
          value: 64,
          label: 'Extra large',
        },
      ]
    },
    {
      name: 'weight',
      icon: <ScaleIcon/>,
      label: 'Weight',
      set: setWeight,
      value: selectedWeight,
      options: [
        {
          value: .5,
          label: 'Light',
        },
        {
          value: 1,
          label: 'Medium',
        },
        {
          value: 2,
          label: 'Regular',
        },
        {
          value: 3,
          label: 'Bold',
        },
      ],
    },
    {
      name: 'color',
      icon: <PaletteIcon/>,
      label: 'Color',
      set: setColor,
      value: selectedColor,
      options: [
        {
          value: 'brand',
          label: 'Default',
        },
        {
          value: 'green',
          label: 'Green',
        },
        {
          value: 'purple',
          label: 'Purple',
        },
        {
          value: 'black',
          label: 'Black',
        },
      ],
    },
  ];
  const memoProps = useMemo(() => {
    return {
      selectedIcon,
      setIcon,
      selectedColor,
      setColor,
      selectedWeight,
      setWeight,
      selectedSize,
      setSize,
      selectedProperty,
      setProperty,
    };
  });

  const currentIcon = icons.find((icon) => icon.name == memoProps.selectedIcon) ?? icons[0];

  const getPropertyValueLabel = (property: IconCustomizerProperty<any>) => {
    return property.options.find((option) => option.value === property.value)?.label ?? null;
  }

  return (
    <Stack __css={styles.card} {...rest}>
      <Box __css={styles.iconSelection}>
        {icons.map((icon) => (
          <Tooltip hasArrow label={icon.name}>
            <IconButton variant="ghost"
                        color={icon.name == selectedIcon ? 'brand.500' : 'inherit'}
                        icon={
                          <IconWrapper
                            src={icon.src}
                            opacity={icon.name == selectedIcon ? 1 : .7}
                            _hover={{opacity: 1}}
                          />
                        } onClick={() => setIcon(icon.name)}/>
          </Tooltip>
        ))}
      </Box>
      <Box __css={styles.iconPreview}
           color={selectedColor === 'brand' ? 'brand.500' : selectedColor}
      >
        <Flex
          align="center"
          justify="center"
          minW={64 * sizeMultiplier}
          minH={64 * sizeMultiplier}
        >
          <IconWrapper src={currentIcon.src}
                       height={selectedSize * sizeMultiplier}
                       width={selectedSize * sizeMultiplier}
                       stroke="currentColor"
                       strokeWidth={selectedWeight}
          />
        </Flex>
      </Box>
      <Box __css={styles.propertySelection}>
        {customizationOptions.map((property) => (
          <Menu>
            <Tooltip hasArrow label={"Select " + property.label.toLowerCase()}>
              <MenuButton
                as={Button}
                variant="ghost"
                color={selectedProperty == property.name ? 'brand.500' : 'inherit'}
                opacity={selectedProperty == property.name ? 1 : .7}
                leftIcon={<>{property.icon}</>}
                onClick={() => setProperty(property.name)}
              >
                <VisuallyHidden>{property.label}</VisuallyHidden>
                {getPropertyValueLabel(property)}
              </MenuButton>
            </Tooltip>
            <MenuList>
              {(property.options).map((option) => (
                <MenuItem onClick={() => property.set(option.value)}
                          value={option.value}
                          bg={property.value == option.value ? 'brand.500 !important' : 'inherit'}
                          color={property.value == option.value ? 'white !important' : 'inherit'}
                >{option.label}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        ))}
      </Box>
    </Stack>
  );
}

export default IconCustomizerWidget;
