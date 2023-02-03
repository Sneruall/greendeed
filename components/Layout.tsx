import React, { Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
