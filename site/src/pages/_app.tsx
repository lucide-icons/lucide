import { CSSReset, ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import customTheme from '../lib/theme';
import '../assets/styling.css';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Lucide</title>
      </Head>
      <ThemeProvider theme={customTheme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
