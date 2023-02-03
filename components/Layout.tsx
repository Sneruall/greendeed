import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
