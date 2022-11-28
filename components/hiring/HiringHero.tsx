import Link from 'next/link';
import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';

function HiringHero() {
  return (
    <div className="site-margins bg-custom-green1">
      <div className="mx-auto max-w-4xl pt-24 sm:pt-32">
        <h1 className="heading-2xl mb-6 sm:mb-14">Find your next employee</h1>
        <h2 className="heading-sm">
          Target a large sustainable oriented audience
        </h2>
        <p className="text-main">
          Why posting a job on greendeed, what’s the advantage towards other
          vacancy/recruitment platforms. And also to other green/sustainable
          platforms. Tell shortly how greendeed works, and why the SDG are so
          beneficial to use (from the perspective of the employer (narrowed down
          the search (sus is so broad it’s har
        </p>
        <h2 className="heading-sm mt-6 sm:mt-8">
          Find the right candidate sooner because of the SDG’s
        </h2>
        <p className="text-main">
          Why posting a job on greendeed, what’s the advantage towards other
          vacancy/recruitment platforms. And also to other green/sustainable
          platforms. Tell shortly how greendeed works, and why the SDG are so
        </p>
        <Link href="#post-job">
          <a className="hover:no-underline">
            <button className="button-with-icon my-10">
              <span className="w-full">Post Job</span>
              <BiChevronsDown className="ml-2 h-6 w-6" />
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default HiringHero;
