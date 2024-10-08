import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { generateCompanyUrl } from '../../helpers/urlGeneration';
import { Company, Job, sdgList } from '../../types/types';
import { JOB_EXPIRATION_TIME_MS } from '../../helpers/constants';

type Props = { job?: Job; company?: Company };

function JobSdgSection({ job, company }: Props) {
  return (
    <div id="sdg" className="bg-custom-yellow2 py-24">
      <div className="heading-xl mx-4 mb-10 text-center">
        <h2>
          Sustainability at{' '}
          {!job?.external && company ? (
            <Link
              href={generateCompanyUrl(company.name.toLowerCase(), company.id)}
              className="underline"
            >
              {company.name}
            </Link>
          ) : (
            <Link
              href={
                job?.applicationMethod === 'website'
                  ? job?.apply
                  : `mailto:${job?.apply}` || '#'
              }
              className="underline"
            >
              {job?.companyData.name}
            </Link>
          )}
        </h2>
      </div>

      <ul className="mx-auto flex flex-col gap-8">
        {(job?.companyData?.sdgs || company?.sdgs)?.map((sdgObject, i) => {
          return (
            <li
              id={'sdg' + sdgObject.sdg}
              key={sdgObject.sdg}
              className={`${i % 2 !== 0 ? 'sdgListEven' : 'sdgListOdd'} ${
                sdgObject.sdg == '1' && 'bg-custom-sdg1'
              } ${sdgObject.sdg == '2' && 'bg-custom-sdg2'}  ${
                sdgObject.sdg == '3' && 'bg-custom-sdg3'
              } ${sdgObject.sdg == '4' && 'bg-custom-sdg4'} ${
                sdgObject.sdg == '5' && 'bg-custom-sdg5'
              } ${sdgObject.sdg == '6' && 'bg-custom-sdg6'} ${
                sdgObject.sdg == '7' && 'bg-custom-sdg7'
              } ${sdgObject.sdg == '8' && 'bg-custom-sdg8'} ${
                sdgObject.sdg == '9' && 'bg-custom-sdg9'
              } ${sdgObject.sdg == '10' && 'bg-custom-sdg10'} ${
                sdgObject.sdg == '11' && 'bg-custom-sdg11'
              } ${sdgObject.sdg == '12' && 'bg-custom-sdg12'} ${
                sdgObject.sdg == '13' && 'bg-custom-sdg13'
              } ${sdgObject.sdg == '14' && 'bg-custom-sdg14'} ${
                sdgObject.sdg == '15' && 'bg-custom-sdg15'
              } ${sdgObject.sdg == '16' && 'bg-custom-sdg16'} ${
                sdgObject.sdg == '17' && 'bg-custom-sdg17'
              }
              shadow-2-extra max-w-screen-2xl flex-row border-[5px] border-custom-grey6 text-white`}
            >
              <div
                className={`${
                  i % 2 === 0 && 'ml-auto'
                } flex max-w-4xl flex-col justify-center p-8 sm:flex-row sm:gap-10`}
              >
                <div
                  className={`${
                    i % 2 !== 0 && 'sm:order-2'
                  } mx-auto min-w-[100px] max-w-[150px] sm:mx-0 sm:max-w-[250px] lg:flex-shrink-0`}
                >
                  <Image
                    src={'/images/icons/sdg-icons/' + sdgObject.sdg + '.png'}
                    width={250}
                    height={250}
                    objectFit="contain"
                    alt={
                      'SDG ' +
                      sdgObject.sdg +
                      ' ' +
                      sdgList[+sdgObject.sdg - 1]?.name
                    }
                  />
                </div>
                <div className="self-center">
                  <p>{sdgObject.text}</p>
                </div>
                <div className=""></div>
              </div>
            </li>
          );
        })}
      </ul>

      {job &&
        !job.closed &&
        new Date().getTime() - job.timestamp < JOB_EXPIRATION_TIME_MS && (
          <div className="my-10 text-center">
            <Link
              href={
                (job?.apply &&
                  (job?.applicationMethod === 'website'
                    ? job?.apply
                    : `mailto:${job?.apply}`)) ||
                '#sustainable-jobs'
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white">
                Apply
              </button>
            </Link>
          </div>
        )}
    </div>
  );
}

export default JobSdgSection;
