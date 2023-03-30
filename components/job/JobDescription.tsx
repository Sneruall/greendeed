import Image from 'next/legacy/image';
import React from 'react';
import { Company, Job } from '../../types/types';
import parse from 'html-react-parser';
import { options } from '../../helpers/htmlReactParserOptions';
import Link from 'next/link';
import { generateCompanyUrl } from '../../helpers/urlGeneration';

type Props = {
  job: Job;
  company?: Company;
};

function JobDescription({ job, company }: Props) {
  return (
    <div className="job-description flex-1">
      {/* top bar */}
      <div className="flex flex-row flex-wrap items-center gap-4 border-b border-b-[#CBCBCB] pb-4 lg:gap-8 xl:flex-nowrap">
        {company && company.logo && (
          <>
            <div className="hidden flex-shrink-0 lg:block">
              <Link
                href={generateCompanyUrl(
                  company.name.toLowerCase(),
                  job.companyId
                )}
              >
                <Image
                  src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                  width={100}
                  height={100}
                  alt={company.name + 'logo'}
                />
              </Link>
            </div>
            <div className="flex-shrink-0 lg:hidden">
              <Link
                href={generateCompanyUrl(
                  company.name.toLowerCase(),
                  job.companyId
                )}
              >
                <Image
                  src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                  width={50}
                  height={50}
                  alt={company.name + 'logo'}
                />
              </Link>
            </div>
          </>
        )}
        <div className="">
          <h1 className="font-omnes text-lg font-normal text-custom-brown1 md:text-2xl lg:text-3xl xl:text-4xl">
            {company ? (
              <Link
                href={generateCompanyUrl(
                  company.name.toLowerCase(),
                  job.companyId
                )}
              >
                {company?.name}
              </Link>
            ) : (
              job.companyData?.name
            )}{' '}
            is hiring a
            <span className="block font-alfa text-xl font-bold md:text-2xl lg:text-3xl xl:my-4 xl:text-5xl xl:leading-tight">
              {job.jobTitle}
            </span>
          </h1>
          {job.closed && (
            <p className="font-bold uppercase text-red-500">Closed</p>
          )}
        </div>
      </div>
      {/* button mobile */}
      {!job.closed && (
        <div className="mt-4 lg:hidden">
          <div className="">
            <Link
              href={
                job?.applicationMethod === 'website'
                  ? job?.apply
                  : `mailto:${job?.apply}` || '#'
              }
              legacyBehavior
            >
              <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white hover:opacity-75">
                Apply now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* job description */}
      <div className="my-10">
        {job.jobDescription && parse(job.jobDescription, options)}
      </div>
    </div>
  );
}

export default JobDescription;
