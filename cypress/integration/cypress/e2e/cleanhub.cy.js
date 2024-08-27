import { mapDepartmentToCategory } from '../scripts/categories.ts';
import { checkAndSubmitJob } from '../scripts/jobUtilities.ts';
import { mapLocation } from '../scripts/location.ts';

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
            const mappedCategory = mapDepartmentToCategory(department);

            const jobTypeElement = doc.querySelector(
              'li:nth-child(2) span.inline-block.align-middle'
            );
            const jobType =
              jobTypeElement?.innerText.trim() || 'Unknown Job Type';

            // Get the location from the paragraph that contains "Location:"
            const locationParagraphs = doc.querySelectorAll('.styledText p');
            let location = 'Unknown Location';
            locationParagraphs.forEach((p) => {
              if (p.textContent.includes('Location:')) {
                location = p.textContent.replace('Location:', '').trim();
              }
            });

            // Use the mapLocation utility to generate locationInfo
            const locationInfo = mapLocation(location);

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Cleanhub',
              },
              jobTitle: jobTitle,
              category: mappedCategory,
              jobDescription: cleanedJobDescription, // Use the cleaned HTML
              jobType: jobType,
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
