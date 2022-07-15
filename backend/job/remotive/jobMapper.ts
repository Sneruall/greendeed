import { jobCategoriesList } from '../../../types/jobCategories';
import { Job, remotiveJob } from '../../../types/types';

export const mapRemotiveJobtoJob = (remotiveJob: remotiveJob): Job => {
  const job: Job = {
    companyName: remotiveJob.company_name,
    companyId: Math.random().toString(), //todo fixen
    companyDescription: '',
    jobTitle: remotiveJob.title,
    category: jobCategoriesList[4], //todo categories mappen
    tags: remotiveJob.tags,
    jobDescription: remotiveJob.description,
    jobType: 'Other', //todo job_type naar jobType mappen
    // salary: remotiveJob.salary, // todo fixen
    locationInfo: {
      location: 'onSite',
    },
    email: '',
    timestamp: +remotiveJob.publication_date,
    id: remotiveJob.id.toString(),
    price: 0,
    paid: true,
    sdg: remotiveJob.sdg, //todo sdg mappen
    hidden: false,
    listed: true,
    closed: false,
    applicationMethod: 'website',
    apply: remotiveJob.url,
    companyWebsite: '',
    external: true,
  };
  return job;
};
