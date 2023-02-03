import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One"
          rel="stylesheet"
        />
        <link href="https://use.typekit.net/nue7njm.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/css/uikit.min.css"
        />
        <script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
        />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/js/uikit-icons.min.js"
        />
        <script
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
