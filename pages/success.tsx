import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HiringHero from '../components/hiring/HiringHero';

function Success() {
  return (
    <>
      <Head>
        <title>Thank you</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <Header />
      <main className="mx-auto">
        <div className="site-margins bg-[url('/images/main/bg-topo2x.png')] bg-cover bg-repeat">
          <div className="mx-auto max-w-5xl pt-24 sm:pt-36">
            <h1 className="heading-2xl mb-6 text-center sm:mb-14">
              Thank you for posting a job!
            </h1>
            <div className="text-center">
              <p className="text-main">
                If it is the first job that your organization is posting to
                Greendeed, we will first verify the job post and the Sustainable
                Development Goals that were submitted. Within 24 hours your job
                will be posted or we will contact you if we have questions.
              </p>
              <p className="text-main">
                If your organization is already known to us and your Sustainable
                Development Goals have not changed, the job will be posted right
                away!
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
      </main>
      <Footer />
    </>
  );
}

export default Success;
