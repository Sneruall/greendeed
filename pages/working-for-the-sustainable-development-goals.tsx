import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SdgPageHero from '../components/sdgs/SdgPageHero';

type Props = {};

function workingForTheSDGs({}: Props) {
  return (
    <div>
      <Head>
        <title>Metaversed Careers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="mx-auto">
        <SdgPageHero />
      </main>
      <Footer />
    </div>
  );
}

export default workingForTheSDGs;
