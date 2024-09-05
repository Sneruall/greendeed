// config.ts

// const generalSelectors = [
//   'a[href*="boards.greenhouse.io"]',
//   'a[href*="jobs.lever.co"]',
//   '.job-posts .job-post a',
//   'tr.job-post a',
//   'div.opening a[data-mapped="true"]',
//   '.career-openings__item a',
//   '.styles_jobs__row__H3nBN',
//   '.posting-title',
//   // Add more specific selectors as needed
//   // Add more common selectors here
// ];

// LINK SELECTORS

const linkSelectorsFactorialhr = ['.job-offer-item a[href*="/job_posting/"]'];
const linkSelectorsGreenhouse = [
  'a[href*="boards.greenhouse.io"]',
  '.career-openings__item a',
  'div.opening a[data-mapped="true"]',
  'tr.job-post a',
  '.job-posts .job-post a',
];
const linkSelectorsLever = ['.posting-title', 'a[href*="jobs.lever.co"]'];
const linkSelectorsTeamtailor = ['a[href*="/jobs/"]'];

// General selectors for extracting job details
const jobDetailSelectors = {
  jobDescription: [
    '.job__description', //for greenhouse
    '#content', //for greenhouse
    '.prose', //for greenhouse and teamtailor
    "[class='section-wrapper page-full-width']", //for lever jobs
  ],
  jobTitle: [
    'h1',
    '.job__title h1',
    '.styles_jobs__column-title__pIf8P',
    '.posting-headline h2',
  ],
  jobType: ['p', '.styles_jobs__column-type__FYVII', '.commitment'], //e.g. full-time
  location: ['.location', '.job__header p.body--metadata', '.workplaceTypes'],
  department: ['.department'],
  // Add more general selectors as needed
};

// Selectors for Lever
const jobDetailSelectorsLever = {
  jobDescription: [
    "[class='section-wrapper page-full-width']", //for lever jobs
  ],
  jobTitle: ['.posting-headline h2'],
  jobType: ['p', '.commitment'], //e.g. full-time
  location: ['.location'],
  department: ['.department'],
};

// Selectors for Teamtailor
const jobDetailSelectorsTeamtailor = {
  jobDescription: ['.prose'],
  jobTitle: ['h1.font-company-header span.textFitted'],
  jobType: ['p', '.styles_jobs__column-type__FYVII', '.commitment'], //e.g. full-time
  location: ['.location', '.job__header p.body--metadata', '.workplaceTypes'],
  department: ['.department'],
};
// Selectors for factorialHR
const jobDetailSelectorsFactorialhr = {
  jobDescription: ['.styledText'],
  jobTitle: ['h1'],
  jobType: ['li:nth-child(2) span.inline-block.align-middle'], //e.g. full-time
  location: ['li:nth-child(3) span.inline-block.align-middle'],
  department: ['li:nth-child(4) span.inline-block.align-middle'],
};

export const companyConfigs = {
  apeel: {
    name: 'Apeel',
    url: 'https://boards.greenhouse.io/apeel',
    selectors: linkSelectorsGreenhouse,
    jobDetails: jobDetailSelectors,
  },
  reformation: {
    name: 'The Reformation',
    url: 'https://boards.greenhouse.io/reformation',
    selectors: linkSelectorsGreenhouse,
    jobDetails: jobDetailSelectors,
  },
  lomi: {
    name: 'Lomi',
    url: 'https://boards.greenhouse.io/pelacase',
    selectors: linkSelectorsGreenhouse,
    jobDetails: jobDetailSelectors,
  },
  fairmat: {
    name: 'FAIRMAT',
    url: 'https://jobs.lever.co/Fairmat/',
    selectors: linkSelectorsLever,
    jobDetails: jobDetailSelectors,
  },
  repurpose: {
    name: 'rePurpose Global',
    url: 'https://jobs.lever.co/repurposeglobal',
    selectors: linkSelectorsLever,
    jobDetails: jobDetailSelectors,
  },
  wagestream: {
    name: 'Wagestream',
    url: 'https://wagestream.com/en/careers#job-vacancies',
    selectors: linkSelectorsTeamtailor,
    jobDetails: jobDetailSelectorsTeamtailor,
  },
  cleanhub: {
    name: 'Cleanhub',
    url: 'https://cleanhub.factorialhr.de/embed/jobs',
    selectors: linkSelectorsFactorialhr,
    jobDetails: jobDetailSelectorsFactorialhr,
  },
  // Add more companies as needed
};
