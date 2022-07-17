import React from 'react';
import { Job } from '../types/types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Link from 'next/link';
import { generateJobUrl } from '../helpers/urlGeneration';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  return (
    <Link
      href={generateJobUrl(
        job.companyName.toLowerCase(),
        job.jobTitle.toLowerCase(),
        job.id
      )}
    >
      <div className="w-full rounded-2xl bg-green-300 py-2 px-5 hover:cursor-pointer hover:opacity-90">
        <div className="flex justify-between">
          <div className="">
            <h2 className="font-semibold">
              {job.jobTitle} | {job.companyName}
            </h2>
            <div className="flex gap-2">
              <p className="my-auto rounded-md bg-gray-400 px-2 py-1 text-sm text-white">
                {job.locationInfo?.location}
              </p>
              <p className="my-auto rounded-md bg-gray-400 px-2 py-1 text-sm text-white">
                $40k - $50k
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <p className="my-auto rounded-full bg-black px-4 py-1 text-white">
              Engineer
            </p>
            <p className="my-auto rounded-full bg-black px-4 py-1 text-white">
              Unity 3D
            </p>
            <p className="my-auto rounded-full bg-black px-4 py-1 text-white">
              Senior
            </p>
          </div>
          <div className="my-auto">
            <p>
              {job.timestamp
                ? timeAgo.format(
                    new Date().getTime() -
                      (new Date().getTime() - job.timestamp),
                    'mini-minute-now'
                  )
                : '??'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
