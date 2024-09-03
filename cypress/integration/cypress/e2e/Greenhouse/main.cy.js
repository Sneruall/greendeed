/*
TODO:
- Update pricing page section so people can contact me: "Want to post regulary or several jobs at once? Contact me!"
- Ensure we also check for pagination like we have on reformation job listing page
*/

// main.cy.js

import { scrapeCompanyJobs } from './scrapers';

describe('Job Scraping Tests', () => {
  it('should scrape jobs for specific company', () => {
    scrapeCompanyJobs('cleanhub');
  });

  //   Example: Running the scraper for multiple companies
  //   it('should scrape jobs for multiple company', () => {
  //     ['apeel', 'lomi', 'fairmat', 'repurpose', 'reformation'].forEach((companyKey) => {
  //       scrapeCompanyJobs(companyKey);
  //     });
  //   });
});
