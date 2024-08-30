import { mapDepartmentToCategory } from '../../scripts/categories.ts';
import { mapJobType } from '../../scripts/jobType.ts';
import { checkAndSubmitJob } from '../../scripts/jobUtilities.ts';
import { mapLocation } from '../../scripts/location.ts';
import { getRandomTimestamp } from '../../scripts/timestampRandomizer.ts';

describe('Scrape Greenhouse job positions and extract details', () => {
  const jobLinks = [];
  const salaryRegex =
    /(?:£|US\$|€|CA\$|AU\$)?\s*\d{1,3}(?:,\d{3})?(?:\s*-\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?(?:\s*(?:to|from)\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?/i;

  it('Retrieve job position links from Greenhouse-hosted job listings', () => {
    cy.visit('https://boards.greenhouse.io/reformation'); // Replace with the target Greenhouse job listing page
    cy.wait(5000); // Wait for the page to load fully

    // Selectors for different HTML structures
    const selectors = [
      'a[href*="boards.greenhouse.io"]',
      'tr.job-post a',
      '.career-openings__item a',
      '.styles_jobs__row__H3nBN',
      'div.opening a[data-mapped="true"]',
    ];

    // Loop through each selector and try to find job links
    cy.wrap(selectors).each((selector) => {
      cy.get('body').then(($body) => {
        // Check if the selector exists first
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
          // Log if the selector did not match anything
          cy.log(`No elements found for selector: ${selector}`);
        }
      });
    });

    cy.then(() => {
      jobLinks.forEach((link) => {
        cy.visit(link);
        cy.wait(3000); // Wait for the job page to load

        cy.document().then((doc) => {
          const getTextFromLabel = (label) => {
            return doc
              .evaluate(
                `//dt[text()="${label}"]/following-sibling::dd`,
                doc,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              )
              .singleNodeValue?.innerText.trim();
          };

          const cleanHTML = (html) => {
            return html
              .replace(/\n/g, '')
              .replace(/ dir="ltr"/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/\s\s+/g, ' ')
              .trim();
          };

          // General job description extraction
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
            getTextFromLabel('Department') || 'Unknown Department';

          // Use job title if no department is found
          const departmentOrTitle =
            department !== 'Unknown Department' ? department : jobTitle;
          const mappedCategory = mapDepartmentToCategory(departmentOrTitle);

          // Extract job type from multiple possible elements
          const jobTypeString =
            getTextFromLabel('Job Type') ||
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

          let salaryData = null;
          const salaryElements = doc.querySelectorAll(
            'p, .job__tags, .job__header'
          );
          salaryElements.forEach((el) => {
            if (el.textContent.includes('Salary')) {
              const salaryMatch = el.textContent.match(salaryRegex);
              if (salaryMatch) {
                const salaryString = salaryMatch[0];
                const currencyMatch = salaryString.match(/£|US\$|€|CA\$|AU\$/);
                const currency = currencyMatch ? currencyMatch[0] : '£';
                const salaryValues = salaryString.match(/\d{1,3}(?:,\d{3})?/g);

                let minSalary, maxSalary;
                if (salaryValues) {
                  minSalary = parseFloat(salaryValues[0].replace(/,/g, ''));
                  maxSalary = salaryValues[1]
                    ? parseFloat(salaryValues[1].replace(/,/g, ''))
                    : null;
                } else {
                  minSalary = 0;
                  maxSalary = 0;
                }

                salaryData = {
                  currency: currency,
                  period: 'Annual',
                  min: {
                    float: minSalary,
                    formatted: salaryValues ? salaryValues[0] : '',
                    value: minSalary,
                  },
                  max: maxSalary
                    ? {
                        float: maxSalary,
                        formatted: salaryValues[1] || '',
                        value: maxSalary,
                      }
                    : null,
                  string: salaryString,
                };
              }
            }
          });

          const locationElement = doc.querySelector(
            '.location, .job__header p.body--metadata'
          );
          const locationText =
            locationElement?.innerText.trim() || 'Unknown Location';
          const locationInfo = mapLocation(locationText);

          const jobData = {
            companyId: '', // Auto-generated in the backend
            companyData: { name: 'The Reformation' }, // Replace with the correct company name
            jobTitle: jobTitle,
            category: mappedCategory,
            jobDescription: cleanedJobDescription,
            jobType: mappedJobType,
            salary: salaryData,
            locationInfo: locationInfo,
            email: 'l.c.vanroomen@gmail.com', // Replace with your email if necessary
            fullName: 'Laurens van Roomen', // Replace with your full name
            timestamp: getRandomTimestamp(),
            id: '', // Auto-generated in the backend
            paid: true,
            published: true,
            listed: true,
            closed: false,
            applicationMethod: 'website', // Adjust accordingly if needed
            apply: link,
            external: false,
            coupon: '',
            invoiceInfo: {},
          };

          checkAndSubmitJob(jobData);
        });
      });
    });
  });
});
