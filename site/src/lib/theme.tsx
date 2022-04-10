import { theme as chakraTheme } from "@chakra-ui/react";

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `'Mukta', sans-serif`,
  },
  colors: {
    ...chakraTheme.colors,
    brand: {
      DEFAULT: '#F56565',
      '50': '#FFFFFF',
      '100': '#FFFEFE',
      '200': '#FCD8D8',
      '300': '#FAB2B2',
      '400': '#F78B8B',
      '500': '#F56565',
      '600': '#F23030',
      '700': '#DC0E0E',
      '800': '#A70B0B',
      '900': '#720707'
    },
  },
  component: {
    Button: {
      variants: {
        solid: (props) => {
          // if(props?.colorScheme === 'red') {
            return {
              bg: props.colorMode === 'dark' ? 'red.700' : 'red.100',
            }
          // }
        },
      }
    }
  }
};

export default theme;
