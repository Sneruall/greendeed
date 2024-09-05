// factorialhr.cy.js
import { scrapeCompanyJobs } from './scrapers';
import { companyConfigs } from './config';

// Filter companies that use the "factorialhr" tool
const factorialhrCompanies = Object.keys(companyConfigs).filter(
  (key) => companyConfigs[key].hrTool === 'factorialhr'
);

describe('Job Scraping: factorialhr', () => {
  it('should scrape jobs for companies using factorialhr', () => {
    factorialhrCompanies.forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });

  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
