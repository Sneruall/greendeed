// config.ts

// General selectors for common job boards
const generalSelectors = [
  'a[href*="boards.greenhouse.io"]',
  '.job-posts .job-post a',
  'tr.job-post a',
  '.career-openings__item a',
  '.styles_jobs__row__H3nBN',
  'div.opening a[data-mapped="true"]',
  // Add more specific selectors as needed
  // Add more common selectors here
];

// General selectors for extracting job details
const jobDetailSelectors = {
  jobDescription: ['.job__description', '#content', '.prose'],
  jobTitle: ['h1', '.job__title h1', '.styles_jobs__column-title__pIf8P'],
  jobType: ['p', '.styles_jobs__column-type__FYVII'],
  location: ['.location', '.job__header p.body--metadata'],
  // Add more general selectors as needed
};

export const companyConfigs = {
  apeel: {
    name: 'Apeel',
    url: 'https://boards.greenhouse.io/apeel',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  reformation: {
    name: 'The Reformation',
    url: 'https://boards.greenhouse.io/reformation',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  pelacase: {
    name: 'Lomi',
    url: 'https://boards.greenhouse.io/pelacase',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  ethic: {
    name: 'Ethic',
    url: 'https://www.ethic.com/roles',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  whogivesacrap: {
    name: 'Who Gives A Crap',
    url: 'https://eu.whogivesacrap.org/pages/jobs',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  // Add more companies as needed
};
