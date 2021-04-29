import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../lib/theme';
import '../assets/styling.css';
import Head from 'next/head';
import { CustomizeIconContext } from "../components/CustomizeIconContext";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Lucide</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <CustomizeIconContext>
          <Component {...pageProps} />
        </CustomizeIconContext>
      </ChakraProvider>
    </>
  );
};

export default App;
