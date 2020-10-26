import { CSSReset, ChakraProvider, ColorModeProvider } from '@chakra-ui/core';
import customTheme from '../lib/theme';
import '../assets/styling.css';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Lucide</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
