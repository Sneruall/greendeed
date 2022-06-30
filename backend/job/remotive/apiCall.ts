import { Job, remotiveJob } from '../../../types/types';
import { mapRemotiveJobtoJob } from './jobMapper';

export async function getRemotiveJobs() {
  // Fetch data from external API
  const res = await fetch(`https://remotive.com/api/remote-jobs?limit=20`);

  const data = await res.json();

  const filteredData = data.jobs.filter((x) => x.id === 1294241);

  console.log(filteredData);

  const remotiveJobs: [remotiveJob] = filteredData;

  const convertedJobs: Job[] = remotiveJobs.map(mapRemotiveJobtoJob);

  return convertedJobs;
}
