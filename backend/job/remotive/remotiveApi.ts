import { Job, remotiveJob, remotiveJobSelection } from '../../../types/types';
import { getremotiveJobSelectionFromMongo } from '../jobDb';
import { mapRemotiveJobtoJob } from './jobMapper';

export async function getRemotiveJobs() {
  // Fetch all jobs from remotive
  const res = await fetch(`https://remotive.com/api/remote-jobs`);
  const data = await res.json();
  const remotiveData: remotiveJob[] = data.jobs;

  // Filter out jobs that have not been selected
  const remotiveJobSelection =
    (await getremotiveJobSelectionFromMongo()) as unknown as remotiveJobSelection;

  const filteredRemotiveJobs = remotiveData.filter((el) => {
    return remotiveJobSelection.some((r) => {
      return r.id === el.id.toString();
    });
  });

  // For each job in filteredRemotiveJobs set the publication date to date that job was added to database and add sdg values
  filteredRemotiveJobs.forEach((el) => {
    const matchInDB = remotiveJobSelection.find(
      (r) => r.id === el.id.toString()
    );
    el.publication_date = matchInDB!.timestamp.toString();
    el.sdg = matchInDB!.sdg;
  });

  // Map remotive jobs to jobs
  const convertedJobs: Job[] = filteredRemotiveJobs.map(mapRemotiveJobtoJob);

  // Return converted remotive jobs
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
