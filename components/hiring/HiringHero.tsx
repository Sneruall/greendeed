import Link from 'next/link';
import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';

function HiringHero() {
  return (
    <div className="bg-custom-green1">
      <div className="mx-auto max-w-3xl pt-32">
        <h1 className="heading-xl mb-14">Find your next employee with us</h1>
        <h2 className="heading-sm">
          Target a large sustainable oriented audience
        </h2>
        <p className="text-main">
          Why posting a job on greendeed, what’s the advantage towards other
          vacancy/recruitment platforms. And also to other green/sustainable
          platforms. Tell shortly how greendeed works, and why the SDG are so
          beneficial to use (from the perspective of the employer (narrowed down
          the search (sus is so broad it’s hard to loose overview for the job
          seekers), attract the right people, trustworthy appeal also because
          our team of experts check whether it’s true.
        </p>
        <h2 className="heading-sm mt-8">
          Find the right candidate sooner because of the SDG’s
        </h2>
        <p className="text-main">
          Why posting a job on greendeed, what’s the advantage towards other
          vacancy/recruitment platforms. And also to other green/sustainable
          platforms. Tell shortly how greendeed works, and why the SDG are so
        </p>
        <Link href="#post-job">
          <a>
            <button className="button-with-icon my-10">
              <div className="flex items-center justify-center gap-2">
                <span>Post Job</span>
                <BiChevronsDown className="h-5 w-5" />
              </div>
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default HiringHero;
