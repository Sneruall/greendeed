import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="!scroll-smooth">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One"
            rel="stylesheet"
          />
          <link href="https://use.typekit.net/nue7njm.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
