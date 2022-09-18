import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Form from '../components/hiring/Form';

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
      <div className="mx-auto max-w-3xl">
        <Form />
      </div>
    </>
  );
}

export default Hiring;
