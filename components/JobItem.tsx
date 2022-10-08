import React from 'react';
import { Job } from '../types/types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Link from 'next/link';
import { generateJobUrl } from '../helpers/urlGeneration';
import Image from 'next/image';
import SDGicons from './SDGicons';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)
//Todo, account for consequense that if company data changes (name, logo) in company DB it won't affect this component as it gets the info from job db, search for job.companyData

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  const sdgList = job.sdg.map((sdg) => (
    <Image
      src={'/images/icons/sdg-icons/' + sdg + '.png'}
      width={40}
      height={40}
      objectFit="contain"
      layout="intrinsic"
    />
  ));

  return (
    <Link
      href={generateJobUrl(
        job.companyData.name.toLowerCase(), //consequence: if name changes a redirect will occur
        job.jobTitle.toLowerCase(),
        job.id
      )}
    >
      <div className="w-full rounded-2xl bg-white py-2 px-5 hover:cursor-pointer hover:opacity-90 sm:rounded-full">
        <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-3">
          <div className="flex gap-4">
            <div className="flex self-center">
              {job.companyData.logo ? ( //consequence: if name changes a redirect will occur
                <Image
                  src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${job.companyData.logo}?_a=AJE+xWI0`}
                  width={40}
                  height={40}
                  className="rounded-full bg-white"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-50"></div>
              )}
            </div>
            <div className="my-auto flex flex-col gap-1">
              <h2 className="text-sm font-bold line-clamp-1 sm:hidden">
                {job.jobTitle}
              </h2>
              <h2 className="text-sm line-clamp-1 sm:hidden">
                {job.companyData.name}
              </h2>
              <h2 className="hidden font-semibold sm:block">
                {/* company data below not retrieved from company db */}
                {job.jobTitle} | {job.companyData.name} {job.sdg}
              </h2>
              <div className="">
                <p className="my-auto text-sm capitalize italic text-black">
                  {job.locationInfo?.location}
                </p>
              </div>
              <div className="flex gap-4 sm:hidden">{sdgList}</div>
            </div>
          </div>

          <div className="hidden justify-center gap-4 sm:flex">{sdgList}</div>
          <div className="hidden justify-end gap-8 self-center sm:flex">
            <span className="self-center text-sm">
              {job.salary?.min.formatted} {job.salary?.max.formatted && '- '}
              {job.salary?.max.formatted}
              {job.salary?.string}
            </span>
            <span>
              {job.timestamp
                ? timeAgo.format(
                    new Date().getTime() -
                      (new Date().getTime() - job.timestamp),
                    'mini-minute-now'
                  )
                : '??'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
