import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';

function HiringHero() {
  return (
    <div className="site-margins bg-[url('/images/main/bg-topo2x.png')] bg-cover bg-repeat">
      <div className="mx-auto max-w-5xl pt-24 sm:pt-36">
        <h1 className="heading-2xl mb-6 text-center sm:mb-14">
          Find your next employee
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="heading-md-omnes">
              Target a large sustainable oriented audience
            </h2>
            <p className="text-main">
              Why posting a job on greendeed, what’s the advantage towards other
              vacancy/recruitment platforms. And also to other green/sustainable
              platforms.
            </p>
            <h2 className="heading-md-omnes mt-6 sm:mt-8">
              Find the right candidate sooner
            </h2>
            <p className="text-main">
              Why posting a job on greendeed, what’s the advantage towards other
              vacancy/recruitment platforms. And also to other green/sustainable
              platforms. Tell shortly
            </p>
          </div>
          <div className="flex justify-center">
            <div className="max-w-sm md:max-w-none">
              <Image
                src={'/images/hiring/interview.png'}
                width={641}
                height={480}
                objectFit="contain"
                layout="intrinsic"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="#post-job">
            <a className="hover:no-underline">
              <button className="button-with-icon-4 my-10">
                <span className="w-full">Post Job</span>
                <BiChevronsDown className="ml-2 h-6 w-6" />
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HiringHero;
