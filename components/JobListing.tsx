import React from 'react';
import JobItem from './JobItem';

const JobListing: React.FC<{ jobs: [] }> = ({ jobs }) => {
  console.log(jobs);
  return (
    <div className="flex flex-col gap-3">
      <JobItem jobs={jobs} />
    </div>
  );
};

export default JobListing;
