// teamtailor.cy.js
import { scrapeCompanyJobs } from '../scrapers';
import { companyConfigs } from '../config';

// Filter companies that use the "teamtailor" tool
const teamtailorCompanies = Object.keys(companyConfigs).filter(
  (key) => companyConfigs[key].hrTool === 'teamtailor'
);

describe('Job Scraping: teamtailor', () => {
  it('should scrape jobs for companies using teamtailor', () => {
    teamtailorCompanies.forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });

  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
