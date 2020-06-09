import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://indestructibletype.com/fonts/Jost.css"
            rel="stylesheet"
          />
        </Head>
        <style jsx global>{`
          html {
            font-family: "Jost";
          }
        `}</style>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
