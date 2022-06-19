import { Job, remotiveJob } from '../../../types/types';

export const mapRemotiveJobtoJob = (remotiveJob: remotiveJob): Job => {
  const job: Job = {
    companyName: remotiveJob.company_name,
    companyId: Math.random().toString(), //todo fixen
    companyDescription: '',
    jobTitle: remotiveJob.title,
    category: 'Other', //todo categories mappen
    tags: remotiveJob.tags,
    jobDescription: remotiveJob.description,
    jobType: 'Other', //todo job_type naar jobType mappen
    // salary: remotiveJob.salary, // todo fixen
    locationInfo: {
      location: 'onSite',
    },
    email: '',
    timestamp: Date.now(),
    id: remotiveJob.id,
    price: 0,
    paid: true,
    hidden: false,
    listed: true,
    closed: false,
    applicationMethod: 'website',
    apply: remotiveJob.url,
    companyWebsite: '',
  };
  return job;
};
