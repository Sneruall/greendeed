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
    <div className="shadow-4 border-green4 relative mx-auto flex-initial rounded-3xl border-2 bg-[#CDF682]/75">
      <div className="absolute left-1/2 h-20 w-full -translate-x-1/2 transform">
        <ul className="flex h-full w-full justify-center gap-3">
          {/* Todo: vervangen door company.sdgs en in image src num.id, bg alignen met sdg bg */}
          {job?.sdg?.map((num) => {
            return (
              <Link href={'#sdg' + num}>
                <a>
                  <li className="relative h-full w-10" key={1}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 200"
                    >
                      <polygon
                        points="0 0, 100 0, 100 200, 50 150, 0 200, 0 0"
                        fill="#e6253a"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 w-5/6 -translate-x-1/2 -translate-y-1/2 transform">
                      <Image
                        src={'/images/icons/sdg-icons/' + num + '.png'}
                        width={50}
                        height={50}
                        objectFit="contain"
                        layout="intrinsic"
                      />
                    </div>
                  </li>
                </a>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="mx-10 mt-28 flex flex-col gap-10">
        {/* Logo, name and date */}
        <div className="text-center">
          <div className="text-2xl font-bold text-custom-brown1">
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
          </div>
          <div>
            <div className="text-center">
              <p className="text-sm">
                Posted{' '}
                {job.timestamp &&
                  timeAgo.format(
                    new Date().getTime() -
                      (new Date().getTime() - job.timestamp)
                  )}
              </p>
            </div>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
}

export default JobInfoCard;
