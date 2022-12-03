import React from 'react';
import { Job } from '../types/types';
import JobItem from './JobItem';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const JobListing: React.FC<{
  jobs: Job[];
  search?: string;
  page: Number;
  resultsPerPage: Number;
}> = ({ jobs, search, page, resultsPerPage }) => {
  const joblist = jobs?.slice(0, +page * +resultsPerPage).map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  return (
    <div id="jobs" className="site-margins relative mx-auto mb-16 max-w-7xl">
      <div
        className="absolute left-1/2 -top-[46px] mb-4 -translate-x-1/2
-translate-y-1/2 transform text-center"
      >
        {jobs?.length > 0 && search && (
          <>
            <span className="text-xs">Results for:</span>
            <h2 className="heading-lg first-letter:capitalize">{search}</h2>
          </>
        )}
      </div>
      <div className="-mt-8 flex flex-col gap-3">{joblist}</div>
      {jobs?.length < 1 && (
        <div
          className="absolute left-1/2 -top-[46px] mb-4 w-full
-translate-x-1/2 -translate-y-1/2 transform text-center"
        >
          <h2 className="heading-md ">
            No sustainable jobs found for '{search}'.
          </h2>
          <p>
            Try another search, set an alert or sign up for our newsletter to
            stay tuned!
          </p>
        </div>
      )}
    </div>
  );
};

export default JobListing;
