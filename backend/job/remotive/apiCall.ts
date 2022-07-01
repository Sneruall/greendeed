import { Job, remotiveJob } from '../../../types/types';
import { mapRemotiveJobtoJob } from './jobMapper';

export async function getRemotiveJobs() {
  // Fetch data from external API
  const res = await fetch(`https://remotive.com/api/remote-jobs`);

  const data = await res.json();

  // const filteredData = data.jobs.filter((x) => x.id === 1294241);

  // console.log(filteredData);

  const myFilter = [
    { id: 1294241, sdg: [1, 2, 3] },
    { id: 1275809, sdg: [1, 2, 3] },
  ];
  const filteredData = data.jobs.filter((el) => {
    return myFilter.some((f) => {
      return f.id === el.id;
    });
  });

  console.log(filteredData);

  const remotiveJobs: [remotiveJob] = filteredData;

  const convertedJobs: Job[] = remotiveJobs.map(mapRemotiveJobtoJob);

  return convertedJobs;
}
