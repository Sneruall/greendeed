import Link from 'next/link';
import React from 'react';
import { Job } from '../types/types';
import JobItem from './JobItem';
import { sdgList } from '../types/types';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const colors = ['red', 'green', 'blue'];

const JobListing: React.FC<{
  jobs: Job[];
  search?: string;
  sdgs?: string;
  page: Number;
  resultsPerPage: Number;
  category?: string;
}> = ({ jobs, search, page, resultsPerPage, category, sdgs }) => {
  const joblist = jobs?.slice(0, +page * +resultsPerPage).map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  const sdgCodes = sdgs?.split('-');
  let sdgNames = sdgCodes?.map(
    (code) => sdgList.find((sdg) => sdg.code === code)?.name
  );

  return (
    <div
      id="jobs"
      className="site-margins relative mx-auto mb-8 -mt-8 max-w-7xl sm:mb-16"
    >
      <div className="mb-4">
        {/* todo: add case when no search category or sdgs (jobs targeting the SDGs) and change when no sdg selected but search (targeting instead of fighting) */}
        {jobs?.length > 0 && (search || category || sdgs) ? (
          <>
            <h2 className="heading-sm-omnes inline text-sm font-bold first-letter:capitalize sm:text-base">
              {!search && category && category} {search} Jobs{' '}
              {!sdgNames && ' targeting the Sustainable Development Goals'}
              {sdgNames && ' figthing for '}
              {sdgNames?.map((name, i) => (
                <span
                  key={name}
                  className={`${name == 'No Poverty' && 'bg-custom-sdg1'} ${
                    name == 'Zero Hunger' && 'bg-custom-sdg2'
                  }  ${
                    name == 'Good Health and Well-Being' && 'bg-custom-sdg3'
                  } ${name == 'Quality Education' && 'bg-custom-sdg4'} ${
                    name == 'Gender Equality' && 'bg-custom-sdg5'
                  } ${
                    name == 'Clean Water and Sanitation' && 'bg-custom-sdg6'
                  } ${
                    name == 'Affordable and Clean Energy' && 'bg-custom-sdg7'
                  } ${
                    name == 'Decent Work and Economic Growth' &&
                    'bg-custom-sdg8'
                  } ${
                    name == 'Industry, Innovation and Infrastructure' &&
                    'bg-custom-sdg9'
                  } ${
                    name == 'Reduced Income and Improved Living Standards' &&
                    'bg-custom-sdg10'
                  } ${
                    name == 'Sustainable Cities and Communities' &&
                    'bg-custom-sdg11'
                  } ${
                    name == 'Responsible Consumption and Production' &&
                    'bg-custom-sdg12'
                  } ${name == 'Climate Action' && 'bg-custom-sdg13'} ${
                    name == 'Life Below Water' && 'bg-custom-sdg14'
                  } ${name == 'Life On Land' && 'bg-custom-sdg15'} ${
                    name == 'Peace, Justice and Strong Institutions' &&
                    'bg-custom-sdg16'
                  } ${
                    name == 'Partnerships for the Goals' && 'bg-custom-sdg17'
                  } mx-1 my-1 inline-block rounded-full p-1 font-normal text-white sm:p-2`}
                >
                  {name}{' '}
                </span>
              ))}
            </h2>
          </>
        ) : (
          jobs?.length > 0 && (
            <h2 className="heading-sm-omnes text-sm font-bold first-letter:capitalize sm:text-base">
              Jobs targeting the Sustainable Development Goals
            </h2>
          )
        )}
      </div>
      <div className="flex flex-col gap-3">{joblist}</div>
      {jobs?.length < 1 && (
        <div
          className="mb-4 w-full
text-center"
        >
          <h2 className="heading-md ">
            No jobs found{search && ' for ' + search}
            {category && ' in ' + category + ' category'}
            {sdgs && ' filtered by SDG ' + sdgs}.
          </h2>
          {/* todo: <p>
            Try another search, set an alert or sign up for our newsletter to
            stay tuned!
          </p> */}
        </div>
      )}
    </div>
  );
};

export default JobListing;
