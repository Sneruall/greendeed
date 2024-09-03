// config.ts

// General selectors for common job boards
// TODO: split out for greenhouse and lever
const generalSelectors = [
  'a[href*="boards.greenhouse.io"]',
  'a[href*="jobs.lever.co"]',
  '.job-posts .job-post a',
  'tr.job-post a',
  '.career-openings__item a',
  '.styles_jobs__row__H3nBN',
  'div.opening a[data-mapped="true"]',
  '.posting-title',
  // Add more specific selectors as needed
  // Add more common selectors here
];

const linkSelectorsWagestream = ['a[href*="careers.wagestream.com/jobs/"]'];

// General selectors for extracting job details
const jobDetailSelectors = {
  jobDescription: [
    '.job__description', //for greenhouse
    '#content', //for greenhouse
    '.prose', //for greenhouse and wagestream type
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

// Selectors for Wagestream
const jobDetailSelectorsWagestream = {
  jobDescription: ['.prose'],
  jobTitle: ['h1.font-company-header span.textFitted'],
  jobType: ['p', '.styles_jobs__column-type__FYVII', '.commitment'], //e.g. full-time
  location: ['.location', '.job__header p.body--metadata', '.workplaceTypes'],
  department: ['.department'],
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
  lomi: {
    name: 'Lomi',
    url: 'https://boards.greenhouse.io/pelacase',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  //   ethic: {
  //     name: 'Ethic',
  //     url: 'https://www.ethic.com/roles',
  //     selectors: generalSelectors,
  //     jobDetails: jobDetailSelectors,
  //   },
  //   whogivesacrap: {
  //     name: 'Who Gives A Crap',
  //     url: 'https://eu.whogivesacrap.org/pages/jobs',
  //     selectors: generalSelectors,
  //     jobDetails: jobDetailSelectors,
  //   },
  //   allbirds: {
  //     name: 'Allbirds',
  //     url: 'https://boards.greenhouse.io/embed/job_board?for=allbirdsretail&b=https%3A%2F%2Fwww.allbirds.com%2Fpages%2Fcareers-retail',
  //     selectors: generalSelectors,
  //     jobDetails: jobDetailSelectors,
  //   },
  fairmat: {
    name: 'FAIRMAT',
    url: 'https://jobs.lever.co/Fairmat/',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  repurpose: {
    name: 'rePurpose Global',
    url: 'https://jobs.lever.co/repurposeglobal',
    selectors: generalSelectors,
    jobDetails: jobDetailSelectors,
  },
  wagestream: {
    name: 'Wagestream',
    url: 'https://wagestream.com/en/careers#job-vacancies',
    selectors: linkSelectorsWagestream,
    jobDetails: jobDetailSelectorsWagestream,
  },
  // Add more companies as needed
};
