// config.ts

export const companyConfigs = {
  apeel: {
    name: 'Apeel',
    url: 'https://boards.greenhouse.io/apeel',
    selectors: [
      'a[href*="boards.greenhouse.io"]',
      'tr.job-post a',
      '.career-openings__item a',
      '.styles_jobs__row__H3nBN',
      'div.opening a[data-mapped="true"]',
    ],
  },
  reformation: {
    name: 'The Reformation',
    url: 'https://boards.greenhouse.io/reformation',
    selectors: [
      'a[href*="boards.greenhouse.io"]',
      'tr.job-post a',
      '.career-openings__item a',
      '.styles_jobs__row__H3nBN',
      'div.opening a[data-mapped="true"]',
    ],
  },
  // Add more companies as needed
};
