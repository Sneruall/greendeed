import { mapDepartmentToCategory } from '../scripts/categories.ts';
import { checkAndSubmitJob } from '../scripts/jobUtilities.ts';

describe('Scrape job positions and extract details', () => {
  const jobLinks = [];
  const salaryRegex =
    /(?:£|US\$|€|CA\$|AU\$)?\s*\d{1,3}(?:,\d{3})?(?:\s*-\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?(?:\s*(?:to|from)\s*(?:£|US\$|€|CA\$|AU\$)?\d{1,3}(?:,\d{3})?)?/i;

  it('Retrieve job position links', () => {
    cy.visit('https://wagestream.com/en/careers#job-vacancies');
    cy.wait(5000); // Wait for the page to load fully

    // Get all job position links
    cy.get('a[href*="careers.wagestream.com/jobs/"]')
      .each(($el) => {
        const jobLink = $el.attr('href');
        jobLinks.push(jobLink);
      })
      .then(() => {
        // Visit each job link and scrape data
        jobLinks.forEach((link) => {
          cy.visit(link);
          cy.wait(3000); // Wait for the job page to load

          // Scrape the required job data
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
                .replace(/\n/g, '') // Remove newlines
                .replace(/ dir="ltr"/g, '') // Remove dir="ltr" attributes (ensure leading space is included)
                .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
                .replace(/\s\s+/g, ' ') // Remove extra spaces
                .trim(); // Trim leading/trailing spaces
            };

            const jobDescriptionHTML = doc.querySelector('.prose').innerHTML;
            const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

            const jobTitleElement = doc.querySelector(
              'h1.font-company-header span.textFitted'
            );
            const jobTitle = jobTitleElement?.innerText || 'Unknown Title'; // Fallback to avoid null error

            const department = getTextFromLabel('Department');
            const mappedCategory = mapDepartmentToCategory(department);

            // Salary extraction with <p> context check
            let salaryData = null;
            const salaryElements = doc.querySelectorAll('p');
            salaryElements.forEach((el) => {
              if (el.textContent.includes('Salary')) {
                const salaryMatch = el.textContent.match(salaryRegex);
                if (salaryMatch) {
                  const salaryString = salaryMatch[0];
                  const currencyMatch =
                    salaryString.match(/£|US\$|€|CA\$|AU\$/);
                  const currency = currencyMatch ? currencyMatch[0] : '£'; // Default to GBP if no currency found
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
                    period: 'Annual', // Assuming annual salary; adjust if needed
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
                      : null, // If maxSalary is null, set it to null or omit this key
                    string: salaryString, // Original string found in the text
                  };
                }
              }
            });

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Wagestream',
              },
              jobTitle: jobTitle,
              category: mappedCategory, // Use the mapped category
              jobDescription: cleanedJobDescription, // Use the cleaned HTML
              jobType: 'Full-time', // Update dynamically if needed
              salary: salaryData, // Use the extracted salary data
              locationInfo: {
                location: 'Hybrid', // Assuming this from the working policy
                onSiteLocation: [getTextFromLabel('Locations')], // Extracting Location
              },
              email: 'l.c.vanroomen@gmail.com', // Replace with your email if necessary
              fullName: 'Laurens van Roomen', // Replace with your full name
              timestamp: 0, // Set as 0 for now
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

            // Call the function to check if job already exists and submit the job
            checkAndSubmitJob(jobData, jobTitle, jobData.companyData.name);
          });
        });
      });
  });
});
