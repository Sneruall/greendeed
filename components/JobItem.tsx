import React from 'react';
import { Job } from '../types/types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Link from 'next/link';
import { generateJobUrl } from '../helpers/urlGeneration';
import Image from 'next/legacy/image';

const JobItem: React.FC<{ job: Job }> = ({ job }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en_US');

  const sdgList = job.companyData.sdgs.slice(0, 5).map((sdgObject) => (
    <div key={sdgObject.sdg} className="self-center">
      <Image
        src={'/images/icons/sdg-icons/' + sdgObject.sdg + '.png'}
        width={40}
        height={40}
        objectFit="contain"
        layout="intrinsic"
        alt={sdgObject.sdg}
        title={'SDG ' + sdgObject.sdg}
      />
    </div>
  ));

  return (
    <Link
      href={generateJobUrl(
        job.companyData.name.toLowerCase(),
        job.jobTitle.toLowerCase(),
        job.id
      )}
      legacyBehavior
    >
      <div className="w-full cursor-pointer rounded-2xl bg-white py-2 px-5 shadow-[0_2px_20px_0px_rgba(0,0,0,0.1)] transition duration-300 ease-in-out hover:bg-[#CDF682]">
        <div className="flex justify-between sm:block">
          <div className="flex flex-col sm:grid sm:grid-cols-6 sm:gap-3 lg:grid-cols-3 xl:grid-cols-5">
            <div className="flex gap-4 sm:col-span-3 lg:col-span-1 xl:col-span-2">
              <div className="flex flex-shrink-0 self-center">
                {job.companyData.logo ? (
                  <Image
                    src={`https://res.cloudinary.com/diw9ouhky/image/upload/c_thumb,h_100,w_100/r_max/f_png/v1/${job.companyData.logo}?_a=AJE+xWI0`}
                    width={40}
                    height={40}
                    className="rounded-full bg-white"
                    alt={job.companyData.name + ' logo'}
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-center">
                    <span className="font-omnes text-xl capitalize text-gray-300">
                      {job.companyData.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="my-auto flex flex-col gap-1 font-omnes text-black">
                <h2 className="text-sm font-semibold sm:text-base">
                  {job.jobTitle} - {job.companyData.name}
                </h2>
                <div
                  className={`${
                    job.locationInfo?.location === 'onSite' ? '' : 'gap-2 '
                  }my-auto flex font-century text-xs`}
                >
                  <div>
                    {job.locationInfo?.location === 'remote' && '🏠 Remote'}
                    {job.locationInfo?.location === 'onSiteOrRemote' &&
                      '🏘️ Hybrid'}
                  </div>
                  {job.locationInfo?.location !== 'remote' && (
                    <div>
                      🏢{' '}
                      {Array.isArray(job.locationInfo?.onSiteLocation)
                        ? job.locationInfo?.onSiteLocation?.join(', ')
                        : job.locationInfo?.onSiteLocation}
                    </div>
                  )}
                </div>
                {job.locationInfo.geoRestriction && (
                  <div className="font-century text-xs line-clamp-1">
                    🌐{' '}
                    {Array.isArray(job.locationInfo.geoRestriction)
                      ? job.locationInfo.geoRestriction.join(', ')
                      : job.locationInfo.geoRestriction}
                  </div>
                )}
                <div className="flex gap-1 sm:hidden">
                  {sdgList}
                  {job.companyData.sdgs.length > 5 && (
                    <div className="self-center">
                      <Image
                        src={'/images/icons/sdg-icons/plus.png'}
                        width={40}
                        height={40}
                        objectFit="contain"
                        layout="intrinsic"
                        title="More SDGs"
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end sm:col-span-2 lg:col-span-1">
              <div className="hidden justify-around gap-1 sm:grid sm:grid-cols-6 md:gap-2">
                {sdgList}
                {job.companyData.sdgs.length > 5 && (
                  <div className="self-center">
                    <Image
                      src={'/images/icons/sdg-icons/plus.png'}
                      width={40}
                      height={40}
                      objectFit="contain"
                      layout="intrinsic"
                      title="More SDGs"
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="hidden justify-end gap-8 self-center font-omnes font-semibold text-black sm:flex xl:col-span-2">
              <span className="hidden self-center text-sm lg:block">
                {job.salary?.min?.formatted && '💰 ' + job.salary?.currency}
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
              </span>
              <span className="text-sm">
                {job.timestamp &&
                  timeAgo.format(
                    new Date().getTime() -
                      (new Date().getTime() - job.timestamp),
                    'mini-minute-now'
                  )}
              </span>
            </div>
          </div>
          <div className="self-center font-omnes font-semibold text-black sm:hidden">
            <span className="text-sm">
              {job.timestamp &&
                timeAgo.format(
                  new Date().getTime() - (new Date().getTime() - job.timestamp),
                  'mini-minute-now'
                )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
