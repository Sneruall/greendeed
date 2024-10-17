// config.lever.ts
const linkSelectorsLever = ['.posting-title', 'a[href*="jobs.lever.co"]'];

const jobDetailSelectorsLever = {
  jobDescription: ["[class='section-wrapper page-full-width']"],
  jobTitle: ['.posting-headline h2'],
  jobType: ['p', '.commitment'], // e.g., full-time
  location: ['.location', '.workplaceTypes'],
  department: ['.department'],
};

export const leverConfigs = {
  // fairmat: {
  //   name: 'FAIRMAT',
  //   url: 'https://jobs.lever.co/Fairmat/',
  //   hrTool: 'lever',
  //   selectors: linkSelectorsLever,
  //   jobDetails: jobDetailSelectorsLever,
  // },
  repurpose: {
    name: 'rePurpose Global',
    url: 'https://jobs.lever.co/repurposeglobal',
    hrTool: 'lever',
    selectors: linkSelectorsLever,
    jobDetails: jobDetailSelectorsLever,
  },
  aquabyte: {
    name: 'Aquabyte',
    url: 'https://jobs.lever.co/aquabyte',
    hrTool: 'lever',
    selectors: linkSelectorsLever,
    jobDetails: jobDetailSelectorsLever,
  },
  // charitywater: {
  //   name: 'Charity: Water',
  //   url: 'https://jobs.lever.co/charitywater',
  //   hrTool: 'lever',
  //   selectors: linkSelectorsLever,
  //   jobDetails: jobDetailSelectorsLever,
  // },
};
