// workable.cy.js
import { scrapeCompanyJobs } from '../scrapers';
import { companyConfigs } from '../config';

// Filter companies that use the "workable" tool
const workableCompanies = Object.keys(companyConfigs).filter(
  (key) => companyConfigs[key].hrTool === 'workable'
);

describe('Job Scraping: Workable', () => {
  it('should scrape jobs for companies using workable', () => {
    workableCompanies.forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });

  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
