/*
TODO:
- Ensure we do not also consider the listing page as a job detail page to scrape (because of the logo link at the top)
- Ensure we do not add duplicate jobs because in the job listing page there might be multiple links to the same job detail page (e.g. text and button)
- Try again running at reformation (it failed), stop it in time as it has many jobs...
- Play around further with the timestamp randomizer to see if it meets my needs
*/

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
