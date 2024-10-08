import Head from 'next/head';
import Link from 'next/link';
import React, { Fragment } from 'react';
import MainLayout from '../layouts/MainLayout';

function Success() {
  return (
    <Fragment>
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

      <div className="mx-auto h-screen">
        <div className="site-margins h-full bg-[url('/images/main/bg-topo2x.png')] bg-cover bg-repeat">
          <div className="mx-auto max-w-5xl pt-24 sm:pt-36">
            <h1 className="heading-2xl mb-6 text-center sm:mb-14">
              Thank you for submitting a job!
            </h1>
            <div className="text-center">
              <p className="text-main">
                The job is posted automatically in 1 minute, unless your
                organization is new to Greendeed. We will then validate the job
                and organization details within 24 hours and try to have the job
                published as soon as possible.
              </p>
            </div>

            <div className="text-center">
              <Link href="/" className="hover:no-underline">
                <button className="button-2 mt-10">
                  <span className="w-full">Go to Home</span>
                </button>
              </Link>
              <div className="my-2 text-custom-brown1 underline opacity-70 hover:opacity-100">
                <Link href="/hiring#post-job" className="">
                  Or post another job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

(Success as any).getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Success;
