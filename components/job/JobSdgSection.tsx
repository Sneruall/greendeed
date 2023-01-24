import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { generateCompanyUrl } from '../../helpers/urlGeneration';
import { Company, Job } from '../../types/types';

type Props = { job?: Job; company?: Company };

function JobSdgSection({ job, company }: Props) {
  return (
    <div id="sdg" className="bg-custom-yellow2 py-24">
      <div className="heading-xl mb-10 text-center">
        Sustainability at{' '}
        {!job?.external && company ? (
          <Link
            href={generateCompanyUrl(company.name.toLowerCase(), company.id)}
          >
            <a className="underline">{company.name}</a>
          </Link>
        ) : (
          <Link
            href={
              job?.applicationMethod === 'website'
                ? 'job?.apply'
                : `mailto:${job?.apply}` || '#'
            }
          >
            <a className="underline">{job?.companyData.name}</a>
          </Link>
        )}
      </div>

      <ul className="mx-auto flex flex-col gap-8">
        {company?.sdgs?.map((sdgObject, i) => {
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
              max-w-screen-2xl flex-row text-white`}
            >
              <div
                className={`${
                  i % 2 === 0 && 'ml-auto'
                } flex max-w-3xl flex-row items-center justify-center gap-10 p-8`}
              >
                <div
                  className={`${
                    i % 2 !== 0 && 'order-2'
                  } min-w-[100px] md:flex-shrink-0`}
                >
                  <Image
                    src={'/images/icons/sdg-icons/' + sdgObject.sdg + '.png'}
                    width={150}
                    height={150}
                    objectFit="contain"
                    layout="intrinsic"
                    // todo add alt={sdg.title}
                  />
                </div>
                <div className="">
                  <p>{sdgObject.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="my-10 text-center">
        <Link
          href={
            (job?.apply &&
              (job?.applicationMethod === 'website'
                ? job?.apply
                : `mailto:${job?.apply}`)) ||
            '#sustainable-jobs'
          }
        >
          <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white">
            {job?.apply ? 'Apply' : `Jobs at ${company?.name}`}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobSdgSection;
