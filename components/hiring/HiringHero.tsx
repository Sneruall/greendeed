import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { BiChevronsDown } from 'react-icons/bi';

function HiringHero() {
  return (
    <div className="site-margins bg-[url('/images/main/bg-topo2x.png')] bg-cover bg-repeat">
      <div className="mx-auto max-w-5xl pt-24 sm:pt-24">
        <h1 className="heading-2xl mx-auto mb-6 max-w-2xl text-center leading-normal sm:mb-16">
          Build a Better Future with the Right Candidates
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="heading-md-omnes2">
              Empower Your Hiring with a Sustainable-Focused Audience
            </h2>
            <p className="text-main">
              By posting your job openings to our platform, you can connect with
              a highly-targeted and engaged audience of candidates who are
              committed to making a difference.
            </p>
            <h2 className="heading-md-omnes2 mt-6 sm:mt-8">
              Find the Right Candidate Sooner
            </h2>
            <p className="text-main">
              Because of our focused and efficient matching process, you'll save
              time and resources while still being able to connect with top
              talent in your field.
            </p>
            <div className="text-center sm:text-left">
              <Link href="#post-job" className="hover:no-underline">
                <button className="button-with-icon-4 my-4">
                  <span className="w-full">Post Job</span>
                  <BiChevronsDown className="ml-2 h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="max-w-sm md:max-w-none">
              <Image
                src={'/images/hiring/interview-hq.png'}
                width={641}
                height={480}
                objectFit="contain"
                layout="intrinsic"
                alt="Two ladies having a job interview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HiringHero;
