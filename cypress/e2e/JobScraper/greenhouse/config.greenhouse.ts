// config.greenhouse.ts
const linkSelectorsGreenhouse = [
  'a[href*="boards.greenhouse.io"]',
  '.career-openings__item a',
  'div.opening a[data-mapped="true"]',
  'tr.job-post a',
  '.job-posts .job-post a',
];

const jobDetailSelectorsGreenhouse = {
  jobDescription: ['.job__description', '#content', '.prose'],
  jobTitle: ['h1', '.job__title h1', '.app-title h1'],
  jobType: ['p'], // e.g., full-time
  location: ['.location', '.job__header p.body--metadata', '.workplaceTypes'],
  department: ['.department'],
};

export const greenhouseConfigs = {
  apeel: {
    name: 'Apeel',
    url: 'https://boards.greenhouse.io/apeel',
    hrTool: 'greenhouse',
    selectors: linkSelectorsGreenhouse,
    jobDetails: jobDetailSelectorsGreenhouse,
  },
  reformation: {
    name: 'The Reformation',
    url: 'https://boards.greenhouse.io/reformation',
    hrTool: 'greenhouse',
    selectors: linkSelectorsGreenhouse,
    jobDetails: jobDetailSelectorsGreenhouse,
  },
  lomi: {
    name: 'Lomi',
    url: 'https://boards.greenhouse.io/pelacase',
    hrTool: 'greenhouse',
    selectors: linkSelectorsGreenhouse,
    jobDetails: jobDetailSelectorsGreenhouse,
  },
};
