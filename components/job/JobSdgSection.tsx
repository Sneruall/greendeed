import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sdgBgClassCalculator } from '../../helpers/sdgBgClassCalculator';
import { generateCompanyUrl } from '../../helpers/urlGeneration';
import { Company, Job, sdgList } from '../../types/types';

type Props = { job: Job; company: Company };

function JobSdgSection({ job, company }: Props) {
  return (
    <div id="sdg" className="bg-custom-yellow2 py-24">
      <div className="heading-xl mb-10 text-center">
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
      <ul className="mx-auto flex flex-col gap-8">
        {/* todo use company sdg instead of job sdg */}
        {job.sdg.map((num) => {
          return (
            <li
              id={'sdg' + num}
              key={num}
              className={`${
                +num % 2 == 0 ? 'sdgListEven' : 'sdgListOdd'
              } max-w-screen-2xl flex-row ${sdgBgClassCalculator(
                num
              )} text-white`}
            >
              <div
                className={`${
                  +num % 2 !== 0 && 'ml-auto'
                } flex max-w-3xl flex-row items-center justify-center gap-10 p-8`}
              >
                <div
                  className={`${
                    +num % 2 == 0 && 'order-2'
                  } min-w-[100px] md:flex-shrink-0`}
                >
                  <Image
                    src={'/images/icons/sdg-icons/' + num + '.png'}
                    width={150}
                    height={150}
                    objectFit="contain"
                    layout="intrinsic"
                  />
                </div>
                <div className="">
                  <p>
                    No poverty Lorem ipsum dolor sit amet, consetetur sadipscing
                    elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua. At vero eos
                    et accusam et justo duo dolores et ea rebum. Stet clita kasd
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="my-10 text-center">
        <Link href={job.apply}>
          <button className="rounded-full bg-custom-brown1 px-8 py-2 text-sm font-bold text-white">
            Apply
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobSdgSection;
