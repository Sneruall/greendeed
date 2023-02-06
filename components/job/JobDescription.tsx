import Image from 'next/image';
import React from 'react';
import { Company, Job } from '../../types/types';
import parse from 'html-react-parser';
import { options } from '../../helpers/htmlReactParserOptions';
import Link from 'next/link';

type Props = {
  job: Job;
  company?: Company;
};

function JobDescription({ job, company }: Props) {
  return (
    <div className="flex-1">
      {/* top bar */}
      <div className="flex flex-row flex-wrap items-center gap-4 border-b border-b-[#CBCBCB] pb-4 lg:gap-8 xl:flex-nowrap">
        {company && company.logo && (
          <>
            <div className="hidden flex-shrink-0 lg:block">
              <Image
                src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                width={100}
                height={100}
              />
            </div>
            <div className="flex-shrink-0 lg:hidden">
              <Image
                src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                width={50}
                height={50}
              />
            </div>
          </>
        )}
        <div className="">
          <h1 className="font-omnes text-lg font-normal text-custom-brown1 md:text-2xl xl:text-4xl">
            {company?.name || job.companyData?.name} is hiring a
            <span className="block font-alfa text-xl font-bold md:text-2xl xl:my-4 xl:text-5xl xl:leading-tight">
              {job.jobTitle}
            </span>
          </h1>
        </div>
      </div>
      {/* button mobile */}
      <div className="mt-4 lg:hidden">
        <div className="">
          <Link
            href={
              job?.applicationMethod === 'website'
                ? job?.apply
                : `mailto:${job?.apply}` || '#'
            }
          >
            <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white hover:opacity-75">
              Apply now
            </button>
          </Link>
        </div>
      </div>
      {/* job description */}
      <div className="my-10">
        {job.jobDescription && parse(job.jobDescription, options)}
      </div>
      {/* <li className="list-outside list-disc">fdsf</li> */}
    </div>
  );
}

export default JobDescription;
