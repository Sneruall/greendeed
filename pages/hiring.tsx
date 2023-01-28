import Head from 'next/head';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CompanyLogos from '../components/hiring/CompanyLogos';
import Form from '../components/hiring/Form';
import HiringHero from '../components/hiring/HiringHero';
import HowItWorks from '../components/hiring/HowItWorks';
import Pricing from '../components/hiring/Pricing';

/*
TODO
- 
*/

function Hiring() {
  // THE JSX CODE, TODO: MAKE SEPARATE COMPONENT(S) OUT OF THE FORM.
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
        {/* Todo: add cool og:image */}
        {/* <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        /> */}
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      <Header />
      <main className="mx-auto">
        <HiringHero />
        <CompanyLogos />
        <Pricing />
        <HowItWorks />
        <Form />
        <CompanyLogos />
      </main>
      <Footer />
    </>
  );
}

export default Hiring;
