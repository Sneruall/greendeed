import { scrapeCompanyJobs } from './scrapers';

describe('Job Scraping: ', () => {
  it('should scrape jobs for companies using lever', () => {
    ['fairmat', 'repurpose'].forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });
  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
