// config.ts

// General selectors for common job boards
const generalSelectors = [
  'a[href*="boards.greenhouse.io"]',
  'tr.job-post a',
  '.career-openings__item a',
  '.styles_jobs__row__H3nBN',
  'div.opening a[data-mapped="true"]',
  // Add more common selectors here
];

export const companyConfigs = {
  apeel: {
    name: 'Apeel',
    url: 'https://boards.greenhouse.io/apeel',
    selectors: generalSelectors,
  },
  reformation: {
    name: 'The Reformation',
    url: 'https://boards.greenhouse.io/reformation',
    selectors: generalSelectors,
  },
  // Add more companies as needed
};
