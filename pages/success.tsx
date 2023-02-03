import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Success() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Job submitted successfully | Greendeed</title>
        <meta
          name="description"
          content="You have successfully submitted a job to Greendeed!"
          key="desc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto">
        <div className="site-margins bg-[url('/images/main/bg-topo2x.png')] bg-cover bg-repeat">
          <div className="mx-auto max-w-5xl pt-24 sm:pt-36">
            <h1 className="heading-2xl mb-6 text-center sm:mb-14">
              Thank you for submitting a job!
            </h1>
            <div className="text-center">
              <p className="text-main">
                The job is posted automatically unless your organization is new
                to Greendeed. We will then validate the job and organization
                details within 24 hours and try to have the job published as
                soon as possible.
              </p>
            </div>

            <div className="text-center">
              <Link href="/">
                <a className="hover:no-underline">
                  <button className="button-2 mt-10">
                    <span className="w-full">Go to Home</span>
                  </button>
                </a>
              </Link>
              <div className="my-2 text-custom-brown1 underline opacity-70 hover:opacity-100">
                <Link href="/hiring#post-job">
                  <a className="">Or post another job</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
