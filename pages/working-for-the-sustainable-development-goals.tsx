import Head from 'next/head';
import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import SdgMenu from '../components/SdgMenu';
import SdgPageHero from '../components/sdgs/SdgPageHero';
import SdgPageList from '../components/sdgs/SdgPageList';
import Tooltip from '../components/Tooltip';
import MainLayout from '../layouts/MainLayout';
import { sdgList } from '../types/types';

type Props = {};

function workingForTheSDGs({}: Props) {
  return (
    <div className="relative">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Where Jobs Meet SDGs | Greendeed</title>
        <meta
          name="description"
          content="Browse the Sustainable Development Goals and find out how you can make a positive impact with your job!"
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content="Where Jobs Meet SDGs | Greendeed"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Browse the Sustainable Development Goals and find out how you can make a positive impact with your job!"
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto mb-10">
        <SdgPageHero />
        <SdgPageList />
      </div>
      <SdgMenu />
    </div>
  );
}

(workingForTheSDGs as any).getLayout = function getLayout(
  page: React.ReactElement
) {
  return <MainLayout>{page}</MainLayout>;
};

export default workingForTheSDGs;
