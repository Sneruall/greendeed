import React from 'react';
import { Job } from '../types/types';
import JobItem from './JobItem';

const JobListing: React.FC<{ jobs: [Job] }> = ({ jobs }) => {
  const joblist = jobs.map((job) => (
    <li className="list-none" key={job._id}>
      <JobItem job={job} />
    </li>
  ));

  return <div className="flex flex-col gap-3">{joblist}</div>;
};

export default JobListing;
