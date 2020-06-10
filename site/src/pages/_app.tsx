import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import customTheme from "../lib/theme";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
