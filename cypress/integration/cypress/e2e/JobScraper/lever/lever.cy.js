// lever.cy.js
import { scrapeCompanyJobs } from './scrapers';
import { companyConfigs } from './config';

// Filter companies that use the "lever" tool
const leverCompanies = Object.keys(companyConfigs).filter(
  (key) => companyConfigs[key].hrTool === 'lever'
);

describe('Job Scraping: Lever', () => {
  it('should scrape jobs for companies using Lever', () => {
    leverCompanies.forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });

  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
