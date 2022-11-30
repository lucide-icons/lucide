import {defineStyleConfig, createMultiStyleConfigHelpers, extendTheme, StyleFunctionProps} from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";

const Footer = defineStyleConfig({
  baseStyle: {
    fontWeight: 'medium',
    display: 'flex',
    flexDirection: ['column', 'row'],
    alignItems: ['flex-start', 'center'],
    justifyContent: 'flex-end',
    width: '100%',
    gap: [2, 4],
    p: [1, 2],
    position: ['static', 'fixed'],
    bottom: 0,
    left: 0,
    right: 0,
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3,
    },
    md: {
      fontSize: 'sm',
      px: 6,
      py: 4,
    },
  },
  variants: {
    solid: {
      bg: 'gray.900',
      color: 'white',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
});

const Package = defineStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    rounded: 'lg',
    position: 'relative',
    width: '100%',
    maxWidth: '1152px',
    bg: props.colorMode == 'light' ? 'white' : 'darkgray.800',
    padding: 8,
  }),
})

const Section = defineStyleConfig({
  baseStyle: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
  },
  variants: {
    first: (props: StyleFunctionProps) => ({
      backgroundImage: mode('linear-gradient(to bottom, rgba(0, 0, 0, .05) 0%, rgba(0, 0, 0, 0) 100%)', 'linear-gradient(to bottom, rgba(255, 255, 255, .05) 0%, rgba(255, 255, 255, 0) 100%)')(props),
    }),
    odd: (props: StyleFunctionProps) => ({
      bgColor: props.colorMode === 'dark' ? 'darkgray.DEFAULT' : 'white',
    }),
    even: (props: StyleFunctionProps) => ({
      bgColor: props.colorMode === 'dark' ? 'gray.DEFAULT' : 'gray.50',
    }),
  },
  defaultProps: {
    variant: 'odd',
  },
});

const IconCustomizerWidgetHelpers = createMultiStyleConfigHelpers(['card' , 'iconSelection', 'iconPreview', 'propertySelection', 'customizerDrawer']);
const IconCustomizerWidget = IconCustomizerWidgetHelpers.defineMultiStyleConfig({
  baseStyle: (props: StyleFunctionProps) => ({
    card: {
      bg: props.colorMode == 'light' ? 'gray.50' : 'darkgray.900',
      borderRadius: 'lg',
      overflow: 'hidden',
    },
    iconSelection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: props.colorMode == 'light' ? 'gray.100' : 'darkgray.800',
      p: 2,
    },
    iconPreview: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: [4, 6, 8],
    },
    propertySelection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: props.colorMode == 'light' ? 'gray.100' : 'darkgray.800',
      p: 2,
    },
  }),
});

const theme = extendTheme({
  fonts: {
    body: `'Quicksand', sans-serif`,
    heading: `'Quicksand', sans-serif`,
    mono: `'Courier Prime', monospace`,
  },
  colors: {
    gray: {
      DEFAULT: '#1A202C',
      '50': '#F2F2F2',
      '100': '#DDDDDE',
      '200': '#C7C8CB',
      '300': '#B1B3B6',
      '400': '#9B9EA3',
      '500': '#86898F',
      '600': '#71747B',
      '700': '#5B5F68',
      '800': '#454A53',
      '900': '#2F3540',
      '950': '#252A36',
    },
    darkgray: {
      DEFAULT: '#0D1016',
      '800': '#141821',
      '900': '#10141B',
    },
    brand: {
      DEFAULT: '#F56565',
      '50': '#FEF0F0',
      '100': '#FDE0E0',
      '200': '#FBC1C1',
      '300': '#F9A3A3',
      '400': '#F78484',
      '500': '#F56565',
      '600': '#C9575A',
      '700': '#9D4A4F',
      '800': '#723B42',
      '900': '#462E37',
      '950': '#2F2732',
    },
    brandAlpha: {
      DEFAULT: 'rgba(245, 101, 101, 1)',
      '0': 'rgba(245, 101, 101, 0)',
      '25': 'rgba(245, 101, 101, .025)',
      '50': 'rgba(245, 101, 101, .05)',
      '100': 'rgba(245, 101, 101, .1)',
      '200': 'rgba(245, 101, 101, .2)',
      '300': 'rgba(245, 101, 101, .3)',
      '400': 'rgba(245, 101, 101, .4)',
      '500': 'rgba(245, 101, 101, .5)',
      '600': 'rgba(245, 101, 101, .6)',
      '700': 'rgba(245, 101, 101, .7)',
      '800': 'rgba(245, 101, 101, .8)',
      '900': 'rgba(245, 101, 101, .9)',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'darkgray.DEFAULT' : 'white',
        fontWeight: 500,
      },
    }),
  },
  spacing: {
    container: [2, 3, 4],
    containerHalf: [1, 1.5, 2],
    sectionY: [4, 8, 10],
  },
  semanticTokens: {
    sizes: {
      'container-max-width': '976px',
    },
    colors: {
      'chakra-border-color': {
        '_light': 'gray.300',
      },
    },
  },
  components: {
    Footer,
    Section,
    Package,
    IconCustomizerWidget,
    Heading: {
      baseStyle: {
        fontWeight: 500,
        mb: '.5em',
      },
      variants: {
        smallCaps: {
          textTransform: 'uppercase',
          fontSize: '1rem',
          fontWeight: 600,
          mb: 0,
        },
        brandSmallCaps: (props: StyleFunctionProps) => ({
          textTransform: 'uppercase',
          fontSize: '1rem',
          color: props.colorMode == 'light' ? 'brand.500' : 'brand.500',
          fontWeight: 600,
          mb: 0,
        }),
      },
    },
    Badge: {
      variants: {
        version: (props: StyleFunctionProps) => ({
          position: 'absolute',
          top: '-0.5rem',
          right: '-0.5rem',
          color: props.colorMode == 'light' ? 'brand.500' : 'brand.500',
          bg: props.colorMode == 'light' ? 'white' : 'darkgray.800',
          boxShadow: 'md',
          zIndex: 1,
          fontSize: '.75rem',
          fontWeight: 500,
          textTransform: 'none',
        }),
      },
    },
    Button: {
      variants: {
        iconListItem: (props: StyleFunctionProps) => ({
          borderWidth: 0,
          rounded: 'lg',
          padding: 2,
          height: 'auto',
          aspectRatio: '1',
          width: '100%',
          position: 'relative',
          whiteSpace: 'normal',
          alignItem: 'center',
          bg: props.colorMode == 'light' ? 'white' : 'darkgray.800',
          _hover: {
            bg: props.colorMode == 'light' ? 'brand.500' : 'brand.500',
            color: 'white',
            transformOrigin: 'center center',
            transform: 'scale(1.1)',
          },
          _focus: {
            bg: props.colorMode == 'light' ? 'brand.500' : 'brand.500',
            color: 'white',
            transformOrigin: 'center center',
            transform: 'scale(1.1)',
          },
          _active: {
            bg: props.colorMode == 'light' ? 'brand.500' : 'brand.500',
            color: 'white',
            transformOrigin: 'center center',
            transform: 'scale(1.1)',
          },
        }),
        solid:  (props: StyleFunctionProps) => ({
          bg: props.colorScheme === 'brand' ? `brand.500` : mode(`${props.colorScheme}.500`, `${props.colorScheme}.200`)(props),
          color: props.colorScheme === 'brand' ? mode(`white`, `black`)(props) : mode(`white`, `gray.800`)(props),
        }),
      },
    },
    Switch: {
      variants: {
        colorMode: (props: StyleFunctionProps) => ({
          track: {
            bg: props.colorMode == 'light' ? 'blue.700' : 'brand.500',
          },
        }),
      },
    },
    Tag: {
      variants: {
        deprecated: (props: StyleFunctionProps) => ({
          container: {
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: '.5rem',
            px: 1,
            py: 1,
            lineHeight: 1,
            height: 'auto',
            minHeight: 'auto',
            bg: props.colorMode == 'light' ? 'brand.100' : 'brand.900',
            color: props.colorMode == 'light' ? 'brand.DEFAULT' : 'brand.DEFAULT',
          }
        }),
        subtle: (props: StyleFunctionProps) => ({
          container: {
            bg: props.colorMode == 'light' ? 'brand.100' : 'brand.900',
            color: props.colorMode == 'light' ? 'brand.DEFAULT' : 'brand.DEFAULT',
          }
        }),
      },
    },
    Input: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: props.colorMode == 'light' ? 'white' : 'darkgray.800',
            borderRadius: 'md',
            py: '.25rem',
            borderColor: props.colorMode == 'light' ? 'gray.100' : 'gray.800',
            focusBorderColor: props.colorMode == 'light' ? 'brand.500' : 'brand.500',
          },
        })
      },
    },
    Kbd: {
      baseStyle: (props: StyleFunctionProps) => ({
        bg: props.colorMode == 'light' ? 'gray.50' : 'gray.950',
        borderRadius: 'sm',
        py: '.25rem',
        borderColor: props.colorMode == 'light' ? 'gray.100' : 'gray.900',
      }),
    },
    SearchInput: {
      rightElementWidth: '10rem'
    },
  },
});

export default theme;
