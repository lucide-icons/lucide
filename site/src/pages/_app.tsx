import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../lib/theme';
import '../assets/styling.css';
import Head from 'next/head';
import { CustomizeIconContext } from '../components/CustomizeIconContext';
import { MobileNavigationProvider } from '../components/MobileNavigationProvider';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Lucide</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <MobileNavigationProvider>
          <CustomizeIconContext>
            <Component {...pageProps} />
          </CustomizeIconContext>
        </MobileNavigationProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
