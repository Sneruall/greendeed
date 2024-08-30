import { mapDepartmentToCategory } from '../scripts/categories.ts';
import { mapJobType } from '../scripts/jobType.ts';
import { checkAndSubmitJob } from '../scripts/jobUtilities.ts';
import { mapLocation } from '../scripts/location.ts';
import { getRandomTimestamp } from '../scripts/timestampRandomizer.ts';

describe('Scrape job positions and extract details', () => {
  const jobLinks = [];
  const salaryRegex =
    /(?:£|US\$|€|CA\$|AU\$)?\s*\d{1,3}(?:,\d{3})?(?:\s*-\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?(?:\s*(?:to|from)\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?/i;

  it('Retrieve job position links', () => {
    cy.visit('https://wagestream.com/en/careers#job-vacancies');
    cy.wait(5000); // Wait for the page to load fully

    cy.get('a[href*="careers.wagestream.com/jobs/"]')
      .each(($el) => {
        const jobLink = $el.attr('href');
        jobLinks.push(jobLink);
      })
      .then(() => {
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

            const jobDescriptionHTML = doc.querySelector('.prose').innerHTML;
            const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

            const jobTitleElement = doc.querySelector(
              'h1.font-company-header span.textFitted'
            );
            const jobTitle = jobTitleElement?.innerText || 'Unknown Title';

            const department = getTextFromLabel('Department');
            // Use job title if no department is found
            const departmentOrTitle =
              department !== 'Unknown Department' ? department : jobTitle;
            const mappedCategory = mapDepartmentToCategory(departmentOrTitle);

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
            const salaryElements = doc.querySelectorAll('p');
            salaryElements.forEach((el) => {
              if (el.textContent.includes('Salary')) {
                const salaryMatch = el.textContent.match(salaryRegex);
                if (salaryMatch) {
                  const salaryString = salaryMatch[0];
                  const currencyMatch =
                    salaryString.match(/£|US\$|€|CA\$|AU\$/);
                  const currency = currencyMatch ? currencyMatch[0] : '£';
                  const salaryValues =
                    salaryString.match(/\d{1,3}(?:,\d{3})?/g);

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

            // Use the mapLocation utility to generate locationInfo
            const locationInfo = mapLocation(getTextFromLabel('Locations'));

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Wagestream',
              },
              jobTitle: jobTitle,
              category: mappedCategory,
              jobDescription: cleanedJobDescription,
              jobType: mappedJobType,
              salary: salaryData,
              locationInfo: locationInfo,
              email: 'l.c.vanroomen@gmail.com', // Replace with your email if necessary
              fullName: 'Laurens van Roomen', // Replace with your full name
              timestamp: getRandomTimestamp(10),
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
