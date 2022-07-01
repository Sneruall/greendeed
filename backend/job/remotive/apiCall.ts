import { Job, remotiveJob } from '../../../types/types';
import { getRemotiveJobIdsFromMongo } from '../db';
import { mapRemotiveJobtoJob } from './jobMapper';

export async function getRemotiveJobs() {
  // Fetch data from external API
  const res = await fetch(`https://remotive.com/api/remote-jobs`);

  const data = await res.json();
  const remotiveData: remotiveJob[] = data.jobs;

  const remotiveJobIds = await getRemotiveJobIdsFromMongo();

  const filteredRemotiveJobs = remotiveData.filter((el) => {
    return remotiveJobIds.some((r) => {
      return r.id === el.id.toString();
    });
  });

  filteredRemotiveJobs.map(
    (obj) => remotiveJobIds.find((o) => o.id === obj.id) || obj
  );

  const convertedJobs: Job[] = filteredRemotiveJobs.map(mapRemotiveJobtoJob);

  return convertedJobs;
}

// {
//   "id":"1282926",
//   "sdg":[
//      1,
//      2,
//      3
//   ]
// }
