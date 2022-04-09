import React from 'react';
import JobItem from './JobItem';

function JobListing() {
  return (
    <div className="flex flex-col gap-3">
      <JobItem />
      <JobItem />
      <JobItem />
      <JobItem />
    </div>
  );
}

export default JobListing;
