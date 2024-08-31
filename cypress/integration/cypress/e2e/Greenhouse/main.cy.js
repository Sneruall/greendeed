// main.cy.js

import { scrapeCompanyJobs } from './scrapers';

describe('Job Scraping Tests', () => {
  it('should scrape jobs for Apeel company', () => {
    scrapeCompanyJobs('apeel');
  });

  // Uncomment this block to run for multiple companies
  // it('should scrape jobs for Reformation company', () => {
  //   scrapeCompanyJobs('reformation');
  // });
});
