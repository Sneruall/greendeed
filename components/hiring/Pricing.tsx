import Link from 'next/link';
import React from 'react';
import { HiCheck } from 'react-icons/hi';

function Pricing() {
  return (
    <div className="my-8 grid px-4 sm:grid-cols-6 sm:px-0 md:grid-cols-4 lg:my-16 lg:grid-cols-3">
      <div className="flex h-full flex-col">
        <div className="h-1/3"></div>
        <div className="h-1/3 bg-custom-yellow2"></div>
        <div className="h-1/3"></div>
      </div>
      <div className="shadow-4 mx-auto my-20 w-full rounded-3xl border-4 border-custom-green5 bg-custom-green3 bg-[url('/images/main/bg-topo.png')] bg-cover bg-repeat sm:col-span-4 md:col-span-2 lg:col-span-1">
        <div className="mb-16 pt-16 text-center">
          <h2 className="heading-lg">What’s included</h2>
        </div>
        <div className="mt-20 flex flex-col gap-4 text-center">
          <div className="flex justify-center gap-4">
            <HiCheck className="my-auto h-6 w-6 stroke-custom-green2 stroke-2 text-custom-green2" />
            <h3 className="heading-sm-omnes my-auto">60-Day Visibility</h3>
          </div>
          <div className="flex justify-center gap-2">
            <HiCheck className="my-auto h-6 w-6 stroke-custom-green2 stroke-2 text-custom-green2" />
            <h3 className="heading-sm-omnes my-auto">Custom Company Page</h3>
          </div>
          <div className="flex justify-center gap-2">
            <HiCheck className="my-auto h-6 w-6 stroke-custom-green2 stroke-2 text-custom-green2" />
            <h3 className="heading-sm-omnes my-auto">
              High And Relevant Visibility
            </h3>
          </div>
          <div className="flex justify-center gap-2">
            <HiCheck className="my-auto h-6 w-6 stroke-custom-green2 stroke-2 text-custom-green2" />
            <h3 className="heading-sm-omnes my-auto">
              Featured On Twitter And{' '}
              <Link href="/blog" className="underline hover:text-black">
                Our Blog
              </Link>
            </h3>
          </div>
          <div className="flex justify-center gap-2">
            <HiCheck className="my-auto h-6 w-6 stroke-custom-green2 stroke-2 text-custom-green2" />
            <h3 className="heading-sm-omnes my-auto">
              Automatically Marked As Closed When Filled
            </h3>
          </div>
          <div className="my-16">
            <Link href="#post-job">
              <button className="button-1">Post Job Now!</button>
            </Link>
            <div>
              <p className="my-2 text-sm tracking-wide">
                Pay as you like, we're donation based.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col">
        <div className="h-1/3"></div>
        <div className="h-1/3 bg-custom-yellow2"></div>
        <div className="h-1/3"></div>
      </div>
    </div>
  );
}

export default Pricing;
