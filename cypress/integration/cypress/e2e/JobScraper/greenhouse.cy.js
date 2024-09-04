import { scrapeCompanyJobs } from './scrapers';

describe('Job Scraping: ', () => {
  //   GREENHOUSE
  it('should scrape jobs for companies using greenhouse', () => {
    ['apeel', 'lomi', 'reformation'].forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });
  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
