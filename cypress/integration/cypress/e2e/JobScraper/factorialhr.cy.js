import { scrapeCompanyJobs } from './scrapers';

describe('Job Scraping: ', () => {
  it('should scrape jobs for companies using factorialhr', () => {
    ['cleanhub'].forEach((companyKey) => {
      scrapeCompanyJobs(companyKey);
    });
  });
  //   it('should scrape jobs for specific company', () => {
  //     scrapeCompanyJobs('cleanhub');
  //   });
});
