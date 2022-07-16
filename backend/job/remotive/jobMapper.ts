import { jobCategoriesList, jobCategory } from '../../../types/jobCategories';
import { Job, remotiveJob } from '../../../types/types';

export const mapRemotiveJobtoJob = (remotiveJob: remotiveJob): Job => {
  const job: Job = {
    companyName: remotiveJob.company_name,
    companyId: 'external',
    companyDescription: 'external',
    jobTitle: remotiveJob.title,
    category: mapRemotiveCategorytoJobCategory(remotiveJob.category),
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

export const mapRemotiveCategorytoJobCategory = (
  remotiveJobCategory: string
): jobCategory => {
  // Remotive uses QA instead of Quality Assurance
  if (remotiveJobCategory === 'QA') {
    remotiveJobCategory = 'Quality Assurance';
  }

  // Check the incoming cateogry from remotive and match it with the jobCategoriesList
  const category = jobCategoriesList.find(
    (category) => category.name === remotiveJobCategory
  );
  if (!category) {
    return jobCategoriesList.find((category) => category.name === 'Other')!;
  }
  return category;
};
