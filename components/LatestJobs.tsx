import Link from 'next/link';
import React from 'react';
import { Job } from '../types/types';
import JobListing from './JobListing';

type Props = {
  jobs: Job[];
};

function LatestJobs({ jobs }: Props) {
  return (
    <div className="site-margins mx-auto mb-10 max-w-screen-xl">
      <h2 className="heading-xl mt-16 mb-10">
        Latest sustainable jobs on Greendeed
      </h2>
      <JobListing page={1} resultsPerPage={3} jobs={jobs} />
      <div className="text-center">
        <Link href="/#jobs">
          <button className="button-2">See all jobs</button>
        </Link>
      </div>
    </div>
  );
}

export default LatestJobs;
