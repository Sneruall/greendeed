import React from 'react';
import { NextPage } from 'next';

import { Job, remotiveJob } from '../../types/types';
import JobListing from '../../components/JobListing';
import { mapRemotiveJobtoJob } from '../../backend/job/remotive/jobMapper';

const remotive: NextPage<{ convertedJobs: [Job] }> = ({ convertedJobs }) => {
  return (
    <div>
      <p>remotive:</p>
      <div>
        <JobListing jobs={convertedJobs} />
        <pre>{JSON.stringify(convertedJobs, null, 2)}</pre>
      </div>
    </div>
  );
};

export default remotive;

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://remotive.com/api/remote-jobs?search=sustainability`
  );
  const data = await res.json();
  const remotiveJobs: [remotiveJob] = data.jobs;

  const convertedJobs: Job[] = remotiveJobs.map(mapRemotiveJobtoJob).reverse();

  // Pass data to the page via props
  return { props: { convertedJobs } };
}
