import { theme as chakraTheme } from "@chakra-ui/react";

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `'Mukta', sans-serif`,
  },
  colors: {
    ...chakraTheme.colors,
    red: {
      50: "#FBC5C5",
      100: "#FAB2B2",
      200: "#F99F9F",
      300: "#F88C8C",
      400: "#F67979",
      500: "#F56565",
      600: "#F45252",
      700: "#F33F3F",
      800: "#F22C2C",
      900: "#F01919",
    }
  },
  components: {
    ...chakraTheme.components,
    Button: {
      ...chakraTheme.components.Button,
      variants: {
        ...chakraTheme.components.Button.variants,
        primary: (props) => ({
          ...chakraTheme.components.Button.variants.solid,
          bg: "red.500",
          color: "white",
          _hover: {
            bg: "red.600",
          },
          _active: {
            bg: "red.700",
          },
        }),
      }
    },
  },
};

export default theme;
