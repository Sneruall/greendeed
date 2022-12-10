import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { generateCompanyUrl } from '../../helpers/urlGeneration';
import { Company, Job } from '../../types/types';

type Props = {
  job: Job;
  company: Company;
};

function JobInfoCard({ job, company }: Props) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  return (
    <div className="mx-auto flex-initial rounded-lg bg-[#CDF682]/75">
      <div className="m-10 flex flex-col gap-10">
        {/* Logo, name and date */}
        <ul className="text-center">
          <li>
            {company && company.logo && (
              <Image
                src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${company.logo}?_a=AJE+xWI0`}
                width={75}
                height={75}
              />
            )}
          </li>
          <li className="text-2xl font-bold text-custom-brown1">
            {!job.external ? (
              <Link
                href={generateCompanyUrl(
                  company.name.toLowerCase(),
                  job.companyId
                )}
              >
                <a className="hover:underline">{company.name}</a>
              </Link>
            ) : (
              <Link href={job.apply}>
                <a className="hover:underline">{job.companyData.name}</a>
              </Link>
            )}
          </li>
        </ul>
        {/* Features */}
        <ul className="flex flex-col gap-2 font-bold text-custom-brown1">
          {job.locationInfo?.location !== 'onSite' && (
            <li>
              {job.locationInfo?.location == 'remote' && '🏠 Remote'}
              {job.locationInfo?.location == 'onSiteOrRemote' && '🏘️ Hybrid'}
            </li>
          )}
          {job.locationInfo?.onSiteLocation && (
            <li>
              {typeof job.locationInfo?.onSiteLocation == 'object'
                ? '🏢 ' + job.locationInfo?.onSiteLocation?.join(', ')
                : '🏢 ' + job.locationInfo?.onSiteLocation}
            </li>
          )}
          {/* todo georestrictionother */}
          {job.locationInfo?.geoRestriction && (
            <li>
              {typeof job.locationInfo?.geoRestriction == 'object'
                ? '🌐 ' + job.locationInfo?.geoRestriction?.join(', ')
                : '🌐 ' + job.locationInfo?.geoRestriction}
            </li>
          )}
          <li>⏰ {job.jobType}</li>
          <li>
            {job.salary?.min?.formatted && '💰'}
            {job.salary?.max?.formatted && job.salary?.currency}
            {job.salary?.min?.formatted?.replace(/US/g, '')}{' '}
            {job.salary?.max?.formatted && '- '}
            {job.salary?.max?.formatted?.replace(/US|CA|AU/g, '')}{' '}
            {job.salary?.min?.formatted &&
              job.salary?.period === 'Hourly' &&
              '/ h'}
            {job.salary?.min?.formatted &&
              job.salary?.period === 'Monthly' &&
              '/ m'}
            {job.salary?.min?.formatted &&
              job.salary?.period === 'Annual' &&
              '/ y'}
            {job.salary?.string && '💰 ' + job.salary.string}
          </li>
        </ul>
        {/* Button */}
        <div>
          <div className="my-2">
            <Link href={job.apply}>
              <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white">
                Apply for the position
              </button>
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm">
              Posted{' '}
              {job.timestamp
                ? timeAgo.format(
                    new Date().getTime() -
                      (new Date().getTime() - job.timestamp)
                  )
                : '??'}{' '}
              ⏱️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobInfoCard;
