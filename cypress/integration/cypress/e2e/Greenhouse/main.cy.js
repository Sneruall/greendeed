// main.cy.js

import { scrapeCompanyJobs } from './scrapers';

describe('Job Scraping Tests', () => {
  it('should scrape jobs for specific company', () => {
    scrapeCompanyJobs('repurpose');
  });

  //   Example: Running the scraper for multiple companies
  //   it('should scrape jobs for multiple company', () => {
  //     ['fairmat', 'repurpose', 'reformation'].forEach((companyKey) => {
  //       scrapeCompanyJobs(companyKey);
  //     });
  //   });
});
