// greenhouse.cy.js
import { scrapeCompanyJobs } from './scrapers';
import { companyConfigs } from './config';

// Filter companies that use the "greenhouse" tool
const greenhouseCompanies = Object.keys(companyConfigs).filter(
  (key) => companyConfigs[key].hrTool === 'greenhouse'
);

describe('Job Scraping: Greenhouse', () => {
  it('should scrape jobs for companies using Greenhouse', () => {
    greenhouseCompanies.forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });

  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
