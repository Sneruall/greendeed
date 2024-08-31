// scrapers.ts

import {
  cleanHTML,
  getTextFromLabel,
  extractSalaryData,
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
    /(?:£|US\$|€|CA\$|AU\$)?\s*\d{1,3}(?:,\d{3})?(?:\s*-\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?(?:\s*(?:to|from)\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?/i;

  cy.visit(companyConfig.url);
  cy.wait(5000); // Wait for the page to load fully

  // Loop through each selector and try to find job links
  cy.wrap(companyConfig.selectors).each((selector) => {
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
        const jobDescriptionElement =
          doc.querySelector('.job__description') ||
          doc.querySelector('#content') ||
          doc.querySelector('.prose');
        const jobDescriptionHTML = jobDescriptionElement
          ? jobDescriptionElement.innerHTML
          : 'No description available';
        const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

        const jobTitleElement =
          doc.querySelector('h1') ||
          doc.querySelector('.job__title h1') ||
          doc.querySelector('.styles_jobs__column-title__pIf8P');
        const jobTitle = jobTitleElement?.innerText.trim() || 'Unknown Title';

        const department =
          getTextFromLabel(doc, 'Department') || 'Unknown Department';
        const departmentOrTitle =
          department !== 'Unknown Department' ? department : jobTitle;
        const mappedCategory = mapDepartmentToCategory(departmentOrTitle);

        const jobTypeString =
          getTextFromLabel('Job Type') ||
          // Check job title for job type indications
          (jobTitle &&
          /full-time|part-time|contract|freelance|internship|traineeship|volunteer/i.test(
            jobTitle
          )
            ? jobTitle
            : null) ||
          // Check all paragraph elements and specific class for job type indications
          Array.from(
            doc.querySelectorAll('p, .styles_jobs__column-type__FYVII')
          )
            .map((el) => el.textContent)
            .find((text) =>
              /full-time|part-time|contract|freelance|internship|traineeship|volunteer/i.test(
                text
              )
            ) ||
          'Unknown Job Type';
        const mappedJobType = mapJobType(jobTypeString);

        const salaryData = extractSalaryData(doc, salaryRegex);

        const locationElement = doc.querySelector(
          '.location, .job__header p.body--metadata'
        );
        const locationText =
          locationElement?.innerText.trim() || 'Unknown Location';
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
