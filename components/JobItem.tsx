import React from 'react';
import { Job } from '../types/types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Link from 'next/link';
import { generateJobUrl } from '../helpers/urlGeneration';
import Image from 'next/image';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)
//Todo, account for consequense that if company data changes (name, logo) in company DB it won't affect this component as it gets the info from job db, search for job.companyData

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  return (
    <Link
      href={generateJobUrl(
        job.companyData.name.toLowerCase(), //consequence: if name changes a redirect will occur
        job.jobTitle.toLowerCase(),
        job.id
      )}
    >
      <div className="w-full rounded-full bg-white py-2 px-5 hover:cursor-pointer hover:opacity-90">
        <div className="grid grid-cols-3 gap-3">
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
            <div className="my-auto">
              <h2 className="font-semibold">
                {/* company data below not retrieved from company db */}
                {job.jobTitle} | {job.companyData.name}
              </h2>
              <div className="">
                <p className="my-auto text-sm capitalize text-black">
                  {job.locationInfo?.location}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Image
              src={'/images/icons/sdg-icons/1-no-poverty.png'}
              width={40}
              height={40}
              objectFit="contain"
              layout="intrinsic"
            />
            <Image
              src={'/images/icons/sdg-icons/12-prod.png'}
              width={40}
              height={40}
              objectFit="contain"
              layout="intrinsic"
            />
            <Image
              src={'/images/icons/sdg-icons/13-climate-action.png'}
              width={40}
              height={40}
              objectFit="contain"
              layout="intrinsic"
            />
            <Image
              src={'/images/icons/sdg-icons/3.png'}
              width={40}
              height={40}
              objectFit="contain"
              layout="intrinsic"
            />
            <Image
              src={'/images/icons/sdg-icons/8.png'}
              width={40}
              height={40}
              objectFit="contain"
              layout="intrinsic"
            />
          </div>
          <div className="flex justify-end gap-8 self-center">
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
