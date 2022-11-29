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
        <title>Hire</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
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
