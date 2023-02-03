import Head from 'next/head';
import React from 'react';
import CompanyLogos from '../components/hiring/CompanyLogos';
import Form from '../components/hiring/Form';
import HiringHero from '../components/hiring/HiringHero';
import HowItWorks from '../components/hiring/HowItWorks';
import Pricing from '../components/hiring/Pricing';

function Hiring() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Post your job to our SDG focussed job board | Greendeed</title>
        <meta
          name="description"
          content="Post jobs based on the Sustainable Development Goals and find sustainability minded employees!"
          key="desc"
        />
        <meta property="og:site_name" content="Greendeed" key="ogsitename" />
        <meta
          property="og:title"
          content="Post your job to our SDG focussed job board | Greendeed"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Post jobs based on the Sustainable Development Goals and find sustainability minded employees!"
          key="ogdesc"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <div className="mx-auto">
        <HiringHero />
        <CompanyLogos />
        <Pricing />
        <HowItWorks />
        <Form />
        <CompanyLogos />
      </div>
    </>
  );
}

export default Hiring;
