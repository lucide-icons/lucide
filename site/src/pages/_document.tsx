import Document, {Head, Html, Main, NextScript} from "next/document";
import {ColorModeScript, useColorModeValue} from "@chakra-ui/react"
import IconStyleElement from "../components/IconStyleElement";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Courier+Prime&family=Quicksand:wght@200;400;500;600;700&display=swap"
            rel="stylesheet"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F56565"/>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
          <meta name="msapplication-TileColor" content="#F56565"/>
          <meta name="theme-color" content="#F56565"/>
          <meta name="google-site-verification"
                content="pr2dEIF-6zFdjXlDxutqEokeinrQNLx5qAjeVCqASDY"/>
          <IconStyleElement />
        </Head>
        <body
          sx={{
            overflow: 'overlay',
            '&::-webkit-scrollbar': {
              width: 3,
              borderRadius: 'md',
              backgroundColor: 'var(--scrollbar-color)',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 'md',
              backgroundColor: 'var(--scrollbar-color)',
            }
          }}
        >
        <ColorModeScript/>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
