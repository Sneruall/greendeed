// scrapers.js

/* 
Working:
- Greenhouse (no iframe)
- Lever (WIP)
*/

import {
  cleanHTML,
  getTextFromLabel,
  extractSalaryData,
  getTextFromSelectors,
} from '../../scripts/utils';
import { mapDepartmentToCategory } from '../../scripts/categories';
import { mapJobType } from '../../scripts/jobType';
import { checkAndSubmitJob } from '../../scripts/jobUtilities';
import { mapLocation } from '../../scripts/location';
import { getRandomTimestamp } from '../../scripts/timestampRandomizer';
import { companyConfigs } from '../../config';

export const scrapeCompanyJobs = (companyKey) => {
  const companyConfig = companyConfigs[companyKey];
  const jobLinks = [];
  const salaryRegex =
    /(?:£|US\$|€|CA\$|AU\$|\$)?\s*\d{1,3}(?:,\d{3})?(?:\s*-\s*(?:£|US\$|€|CA\$|AU\$|\$)?\s*\d{1,3}(?:,\d{3})?)?(?:\s*(?:to|from)\s*(?:£|US\$|€|CA\$|AU\$|\$)?\s*\d{1,3}(?:,\d{3})?)?/i;

  cy.visit(companyConfig.url);
  cy.wait(5000); // Wait for the page to load fully

  const selectors = companyConfig.selectors || [];
  const jobDetailSelectors = companyConfig.jobDetails || {};

  // Loop through each selector and try to find job links
  cy.wrap(selectors).each((selector) => {
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout: 10000 }).each(($el) => {
          const jobLink = $el.attr('href');
          if (jobLink && !jobLinks.includes(jobLink)) {
            jobLinks.push(
              jobLink.startsWith('http')
                ? jobLink
                : `https://boards.greenhouse.io${jobLink}`
            );
          }
        });
      } else {
        cy.log(`No elements found for selector: ${selector}`);
      }
    });
  });

  cy.then(() => {
    jobLinks.forEach((link) => {
      cy.visit(link);
      cy.wait(3000); // Wait for the job page to load

      cy.document().then((doc) => {
        // Get job description using the general selectors
        const jobDescriptionElement = jobDetailSelectors.jobDescription
          .map((selector) => doc.querySelector(selector))
          .find((el) => el);
        const jobDescriptionHTML = jobDescriptionElement
          ? jobDescriptionElement.innerHTML
          : 'No description available';
        const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

        // Get job title using the general selectors
        const jobTitle =
          getTextFromSelectors(doc, jobDetailSelectors.jobTitle) ||
          'Unknown Title';

        const department =
          getTextFromLabel(doc, 'Department') ||
          getTextFromSelectors(doc, jobDetailSelectors.department) ||
          'Unknown Department';
        const departmentOrTitle =
          department !== 'Unknown Department' ? department : jobTitle;
        cy.log('department found: ' + departmentOrTitle);
        const mappedCategory = mapDepartmentToCategory(departmentOrTitle);

        // Get job type using the general selectors
        const jobTypeString =
          getTextFromLabel(doc, 'Job Type') ||
          jobTitle ||
          jobDetailSelectors.jobType
            .flatMap((selector) =>
              Array.from(doc.querySelectorAll(selector)).map(
                (el) => el.textContent
              )
            )
            .find((text) =>
              /full-time|part-time|contract|freelance|internship|traineeship|volunteer/i.test(
                text
              )
            ) ||
          'Unknown Job Type';
        const mappedJobType = mapJobType(jobTypeString);

        const salaryData = extractSalaryData(doc, salaryRegex);

        // Get location using the general selectors
        const locationText =
          getTextFromSelectors(doc, jobDetailSelectors.location) ||
          'Unknown Location';
        const locationInfo = mapLocation(locationText);

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
          timestamp: getRandomTimestamp(),
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

        checkAndSubmitJob(jobData);
      });
    });
  });
};
