import { mapDepartmentToCategory } from '../scripts/categories.ts';
import { checkAndSubmitJob } from '../scripts/jobUtilities.ts';
import { mapLocation } from '../scripts/location.ts';
import { mapJobType } from '../scripts/jobType.ts';

describe('Scrape job positions and extract details from Cleanhub', () => {
  const jobLinks = [];

  it('Retrieve job position links from Cleanhub', () => {
    cy.visit('https://cleanhub.factorialhr.de/embed/jobs');
    cy.wait(5000); // Wait for the page to load fully

    cy.get('.job-offer-item a[href*="/job_posting/"]')
      .each(($el) => {
        const jobLink = $el.attr('href');
        jobLinks.push(jobLink);
      })
      .then(() => {
        jobLinks.forEach((link) => {
          cy.visit(link);
          cy.wait(3000); // Wait for the job page to load

          cy.document().then((doc) => {
            const cleanHTML = (html) => {
              return html
                .replace(/\n/g, '')
                .replace(/ dir="ltr"/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/\s\s+/g, ' ')
                .trim();
            };

            const jobDescriptionElement = doc.querySelector('.styledText');
            const jobDescriptionHTML = jobDescriptionElement
              ? jobDescriptionElement.innerHTML
              : 'No description available';
            const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

            const jobTitleElement = doc.querySelector('h1');
            const jobTitle =
              jobTitleElement?.innerText.trim() || 'Unknown Title';

            const departmentElement = doc.querySelector(
              'li:nth-child(4) span.inline-block.align-middle'
            );
            const department =
              departmentElement?.innerText.trim() || 'Unknown Department';
            // Use job title if no department is found
            const departmentOrTitle =
              department !== 'Unknown Department' ? department : jobTitle;
            const mappedCategory = mapDepartmentToCategory(departmentOrTitle);

            const jobTypeElement = doc.querySelector(
              'li:nth-child(2) span.inline-block.align-middle'
            );
            const jobTypeString =
              jobTypeElement?.innerText.trim() ||
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
            const mappedJobType = mapJobType(jobTypeString); // Use mapJobType

            let location;
            let locationType;
            const locationElement = doc.querySelector(
              'li:nth-child(3) span.inline-block.align-middle'
            );

            // Get the location from the paragraph that contains "Location:"
            const locationParagraphs = doc.querySelectorAll('.styledText p');

            locationParagraphs.forEach((p) => {
              if (p.textContent.includes('Location:')) {
                location = p.textContent.replace('Location:', '').trim();
              }
            });

            if (locationElement) {
              // Get location from the sidebar things
              if (locationElement?.innerText.trim()) {
                locationType = locationElement?.innerText.trim();
                cy.log('location found in sidebar: ' + location);
              }
            }

            if (!location) {
              location = 'Berlin';
              cy.log('location not found, setting Berlin');
            }

            // Use the mapLocation utility to generate locationInfo
            const locationInfo = mapLocation(location, locationType);

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Cleanhub',
              },
              jobTitle: jobTitle,
              category: mappedCategory,
              jobDescription: cleanedJobDescription, // Use the cleaned HTML
              jobType: mappedJobType, // Use the normalized job type
              locationInfo: locationInfo,
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

            checkAndSubmitJob(jobData);
          });
        });
      });
  });
});
