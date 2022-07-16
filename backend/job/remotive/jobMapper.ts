import { jobCategoriesList, jobCategory } from '../../../types/jobCategories';
import { Job, jobType, remotiveJob } from '../../../types/types';

export const mapRemotiveJobtoJob = (remotiveJob: remotiveJob): Job => {
  const job: Job = {
    companyName: remotiveJob.company_name,
    companyId: 'external',
    companyDescription: 'external',
    jobTitle: remotiveJob.title,
    category: mapRemotiveCategoryToJobCategory(remotiveJob.category),
    tags: remotiveJob.tags,
    jobDescription: remotiveJob.description,
    jobType: mapRemotiveJobTypesToJobTypes(remotiveJob.job_type), //todo job_type naar jobType mappen
    salary: {
      min: {
        float: null,
        formatted: '',
        value: '',
      },
      max: {
        float: null,
        formatted: '',
        value: '',
      },
      currency: '',
      period: '',
      string: remotiveJob.salary,
    },
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

const mapRemotiveCategoryToJobCategory = (
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

const mapRemotiveJobTypesToJobTypes = (remotiveJobType: string): jobType => {
  switch (remotiveJobType) {
    case 'full_time':
      return 'Full-time';
    case 'part_time':
      return 'Part-time';
    case 'contract':
      return 'Contract';
    case 'internship':
      return 'Internship';
    case 'freelance':
      return 'Freelance';
    case 'other':
      return 'Other';
    default:
      return 'Other';
  }
};
