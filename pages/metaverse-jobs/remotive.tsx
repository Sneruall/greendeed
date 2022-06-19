import React from 'react';
import { NextPage } from 'next';

import { remotiveJob } from '../../types/types';

const remotive: NextPage<{ jobs: remotiveJob }> = ({ jobs }) => {
  return (
    <div>
      <p>remotive:</p>
      <div>
        <pre>{JSON.stringify(jobs, null, 2)}</pre>
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
  const jobs = data.jobs;

  // Pass data to the page via props
  return { props: { jobs } };
}
