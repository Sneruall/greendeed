import Head from 'next/head';
import React from 'react';
import SdgPageHero from '../components/sdgs/SdgPageHero';
import SdgPageList from '../components/sdgs/SdgPageList';

type Props = {};

function workingForTheSDGs({}: Props) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>
          Explore the SDGs and how jobs can make a difference | Greendeed
        </title>
        <meta
          name="description"
          content="Browse the Sustainable Development Goals and find out how you can make a positive impact with your work!"
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content="Explore the SDGs and how jobs can make a difference | Greendeed"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Browse the Sustainable Development Goals and find out how you can make a positive impact with your work!"
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto mb-10">
        <SdgPageHero />
        <SdgPageList />
      </div>
    </div>
  );
}

export default workingForTheSDGs;
