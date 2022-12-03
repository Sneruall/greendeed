import React from 'react';
import { Job } from '../types/types';
import JobItem from './JobItem';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const JobListing: React.FC<{
  jobs: Job[];
  search?: String;
  page: Number;
  resultsPerPage: Number;
}> = ({ jobs, search, page, resultsPerPage }) => {
  const joblist = jobs?.slice(0, +page * +resultsPerPage).map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  return (
    <div id="jobs" className="site-margins mx-auto mb-10 -mt-8 max-w-7xl">
      <div className="flex flex-col gap-3">{joblist}</div>
      {jobs?.length < 1 && (
        <div className="text-center">
          <p>No jobs found for {search}</p>
        </div>
      )}
    </div>
  );
};

export default JobListing;
