import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { generateCompanyUrl } from '../../helpers/urlGeneration';
import { Company, Job, sdgList } from '../../types/types';

type Props = { job: Job; company: Company };

function JobSdgSection({ job, company }: Props) {
  return (
    <div id="sdg" className="my-24">
      <div className="heading-xl my-10 text-center">
        Sustainability at{' '}
        {!job.external ? (
          <Link
            href={generateCompanyUrl(company.name.toLowerCase(), job.companyId)}
          >
            <a className="underline">{company.name}</a>
          </Link>
        ) : (
          <Link href={job.apply}>
            <a className="underline">{job.companyData.name}</a>
          </Link>
        )}
      </div>
      <ul className="mx-auto flex max-w-2xl flex-col gap-8">
        {/* todo use company sdg instead of job sdg */}
        {job.sdg.map((num) => {
          return (
            <li
              id={'sdg' + num}
              className="flex flex-row items-center justify-center gap-10"
            >
              <div
                key={num}
                className="flex-shrink-0 cursor-pointer transition duration-200 ease-in-out hover:scale-110"
              >
                <Image
                  src={'/images/icons/sdg-icons/' + num + '.png'}
                  width={50}
                  height={50}
                  objectFit="contain"
                  layout="intrinsic"
                />
              </div>
              <div>
                <h4 className="font-bold">
                  {sdgList.find((el) => el.code === num)!.name}
                </h4>
                <p>
                  No poverty Lorem ipsum dolor sit amet, consetetur sadipscing
                  elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                  accusam et justo duo dolores et ea rebum. Stet clita kasd
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default JobSdgSection;
