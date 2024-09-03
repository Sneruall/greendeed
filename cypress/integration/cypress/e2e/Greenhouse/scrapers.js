import {
  cleanHTML,
  getTextFromLabel,
  extractSalaryData,
  getTextFromSelectors,
  getJobTypeFromSelectors,
  getHTMLFromSelectors,
  getTextFromMultipleSelectors,
} from '../../scripts/utils';
import { mapDepartmentToCategory } from '../../scripts/categories';
import { mapJobType } from '../../scripts/jobType';
import { checkJobExists, submitJob } from '../../scripts/jobUtilities';
import { mapLocation } from '../../scripts/location';
import { getBatchedTimestamps } from '../../scripts/timestampRandomizer';
import { companyConfigs } from '../../config';

export const scrapeCompanyJobs = (companyKey) => {
  const companyConfig = companyConfigs[companyKey];
  const jobLinks = [];
  const salaryRegex =
    /(?:£|US\$|€|CA\$|AU\$|\$|USD|EUR|GBP|CAD|AUD)?\s*(?:\d{1,3}(?:,\d{3})*|\d+)(?:\s*-\s*(?:£|US\$|€|CA\$|AU\$|\$|USD|EUR|GBP|CAD|AUD)?\s*(?:\d{1,3}(?:,\d{3})*|\d+))?(?:\s*(?:to|from|and)\s*(?:£|US\$|€|CA\$|AU\$|\$|USD|EUR|GBP|CAD|AUD)?\s*(?:\d{1,3}(?:,\d{3})*|\d+))?\s*(?:per\s*(?:year|annum|month|week|day|hour))?/i;

  cy.log(`Visiting company URL: ${companyConfig.url}`);
  cy.visit(companyConfig.url);
  cy.wait(5000); // Wait for the page to load fully

  const selectors = companyConfig.selectors || [];
  const jobDetailSelectors = companyConfig.jobDetails || {};

  // Loop through each selector and try to find job links
  cy.wrap(selectors).each((selector) => {
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.log(`Found elements for selector: ${selector}`);
        cy.get(selector, { timeout: 10000 }).each(($el) => {
          const jobLink = $el.attr('href');
          if (jobLink && !jobLinks.includes(jobLink)) {
            const fullJobLink = jobLink.startsWith('http')
              ? jobLink
              : `https://boards.greenhouse.io${jobLink}`;

            cy.log(`Found job link: ${fullJobLink}`);

            // Check if the job is already in the database
            checkJobExists({ apply: fullJobLink }).then((response) => {
              cy.log(`Checking if job exists at link: ${fullJobLink}`);
              if (response.status === 204) {
                // Only add the job link if it does not already exist
                cy.log(`Job link ${fullJobLink} is new. Adding to list.`);
                jobLinks.push(fullJobLink);
              } else {
                cy.log(
                  `Job link ${fullJobLink} already exists. Status code was: ${response.status}`
                );
              }
            });
          } else {
            cy.log(`Job link ${jobLink} is either null or already included.`);
          }
        });
      } else {
        cy.log(`No elements found for selector: ${selector}`);
      }
    });
  });

  cy.then(() => {
    cy.log(`Total job links found: ${jobLinks.length}`);
    const totalJobs = jobLinks.length;
    const timestamps = getBatchedTimestamps(totalJobs);

    jobLinks.forEach((link, index) => {
      cy.log(`Visiting job detail page: ${link}`);
      cy.visit(link);
      cy.wait(3000); // Wait for the job page to load

      cy.document().then((doc) => {
        cy.log(`Extracting job details from: ${link}`);

        const jobDescriptionHTML =
          getHTMLFromSelectors(doc, jobDetailSelectors.jobDescription) ||
          'No description available';
        const cleanedJobDescription = cleanHTML(jobDescriptionHTML);
        const jobTitle =
          getTextFromSelectors(doc, jobDetailSelectors.jobTitle) ||
          'Unknown Title';
        const department =
          getTextFromLabel(doc, 'Department') ||
          getTextFromSelectors(doc, jobDetailSelectors.department) ||
          'Unknown Department';
        const departmentOrTitle =
          department !== 'Unknown Department' ? department : jobTitle;
        const mappedCategory = mapDepartmentToCategory(departmentOrTitle);
        const jobTypeText =
          getTextFromLabel(doc, 'Job Type') ||
          jobTitle ||
          getJobTypeFromSelectors(doc, jobDetailSelectors.jobType) ||
          'Unknown Job Type';
        const mappedJobType = mapJobType(jobTypeText);
        const salaryData = extractSalaryData(doc, salaryRegex);
        const locationSelectors = jobDetailSelectors.location || [];
        const locationText =
          getTextFromMultipleSelectors(doc, locationSelectors) ||
          'Unknown Location';
        const locationInfo = mapLocation(locationText);

        // Prepare job data
        const jobData = {
          companyId: '',
          companyData: { name: companyConfig.name },
          jobTitle,
          category: mappedCategory,
          jobDescription: cleanedJobDescription,
          jobType: mappedJobType,
          salary: salaryData,
          locationInfo: locationInfo,
          email: 'l.c.vanroomen@gmail.com',
          fullName: 'Laurens van Roomen',
          timestamp: 0, // todo: get rid of timestamp randomizer script.
          id: '',
          paid: true,
          published: true,
          listed: true,
          closed: false,
          applicationMethod: 'website',
          apply: link,
          external: false,
          coupon: '',
          invoiceInfo: {},
        };

        cy.log(`Job data prepared: ${JSON.stringify(jobData)}`);

        // Check and submit the job
        submitJob(jobData);
      });
    });
  });
};
