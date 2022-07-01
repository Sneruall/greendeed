import { Job, remotiveJob } from '../../../types/types';
import { mapRemotiveJobtoJob } from './jobMapper';

export async function getRemotiveJobs() {
  // Fetch data from external API
  const res = await fetch(`https://remotive.com/api/remote-jobs`);

  const data = await res.json();
  const remotiveData: remotiveJob[] = data.jobs;

  //todo get this info from a database that we fill/empty using postman requests
  const myFilter = [
    { id: '1294241', sdg: [1, 2, 3] },
    { id: '1275809', sdg: [1, 2, 3] },
  ];

  const filteredData = remotiveData.filter((el) => {
    return myFilter.some((f) => {
      return f.id === el.id.toString();
    });
  });

  const remotiveJobs: remotiveJob[] = filteredData;

  const convertedJobs: Job[] = remotiveJobs.map(mapRemotiveJobtoJob);

  return convertedJobs;
}
