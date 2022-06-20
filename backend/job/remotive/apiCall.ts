import { Job, remotiveJob } from '../../../types/types';
import { mapRemotiveJobtoJob } from './jobMapper';

export async function getRemotiveJobs() {
  // Fetch data from external API
  const res = await fetch(
    `https://remotive.com/api/remote-jobs?search=sustainability`
  );
  const data = await res.json();
  const remotiveJobs: [remotiveJob] = data.jobs;

  const convertedJobs: Job[] = remotiveJobs.map(mapRemotiveJobtoJob);

  return convertedJobs;

  // Pass data to the page via props
  //   return { props: { convertedJobs } };
}
