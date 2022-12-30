import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sdgHexCalculator } from '../../helpers/sdgHexCalculator';
import {
  generateCompanyUrl,
  generateJobUrl,
} from '../../helpers/urlGeneration';
import { Company, Job } from '../../types/types';

type Props = {
  job: Job;
};

function SimilarJobItem({ job }: Props) {
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
      <div className="shadow-4 hover:shadow-2-extra border-green4 relative mx-8 h-full flex-initial cursor-pointer rounded-3xl border-2 bg-custom-green3 bg-[url('/images/main/bg-topo.png')] bg-cover bg-repeat">
        <div className="absolute left-1/2 h-20 w-full -translate-x-1/2 transform">
          <ul className="flex h-full w-full -translate-y-1 justify-center gap-3">
            {/* Todo: vervangen door company.sdgs en in image src num.id, bg alignen met sdg bg */}
            {job?.companyData?.sdgs?.map((sdgObject) => {
              return (
                <li
                  className="relative h-full w-10 hover:opacity-90"
                  key={sdgObject?.sdg}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200">
                    <polygon
                      points="0 0, 100 0, 100 200, 50 150, 0 200, 0 0"
                      fill={`${sdgHexCalculator(sdgObject?.sdg?.toString())}`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 w-5/6 -translate-x-1/2 -translate-y-1/2 transform">
                    <Image
                      src={'/images/icons/sdg-icons/' + sdgObject?.sdg + '.png'}
                      width={50}
                      height={50}
                      objectFit="contain"
                      layout="intrinsic"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mx-10 mt-28 flex flex-col gap-10">
          {/* Logo, name and date */}
          <div className="text-center">
            <div className="text-2xl font-bold text-custom-brown1">
              <h3 className="heading-md">{job.jobTitle}</h3>
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
          <div className="text-center">
            {/* todo, job.companyData.logo vervangen door company.logo */}
            {job.companyData.logo ? (
              <Image
                src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_200,w_200/r_max/f_png/v1/${job.companyData.logo}?_a=AJE+xWI0`}
                width={50}
                height={50}
              />
            ) : (
              <h3 className="heading-sm-omnes mb-10">{job.companyData.name}</h3>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SimilarJobItem;
