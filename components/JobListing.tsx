import React from 'react';
import { Job } from '../types/types';
import JobItem from './JobItem';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const JobListing: React.FC<{ jobs: Job[]; search?: String }> = ({
  jobs,
  search,
}) => {
  const joblist = jobs.map((job) => (
    <li className="list-none" key={job.id}>
      <JobItem job={job} />
    </li>
  ));

  return (
    <div>
      <div className="flex flex-col gap-3">{joblist}</div>
      {jobs.length < 1 && (
        <div className="text-center">
          <p>No jobs found for {search}</p>
        </div>
      )}
    </div>
  );
};

export default JobListing;
