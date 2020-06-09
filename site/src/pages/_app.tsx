import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "../lib/theme";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
