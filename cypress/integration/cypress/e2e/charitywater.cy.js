import { mapDepartmentToCategory } from '../scripts/categories.ts';
import { checkAndSubmitJob } from '../scripts/jobUtilities.ts';

describe('Scrape job positions and extract details from charity: water', () => {
  const jobLinks = [];

  it('Retrieve job position links from charity: water', () => {
    cy.visit('https://www.charitywater.org/about/jobs');
    cy.wait(5000); // Wait for the page to load fully

    // Get all job position links
    cy.get('a[href*="jobs.lever.co/charitywater/"]')
      .each(($el) => {
        const jobLink = $el.attr('href');
        jobLinks.push(jobLink);
      })
      .then(() => {
        // Visit each job link and scrape data
        jobLinks.forEach((link) => {
          cy.visit(link);
          cy.wait(3000); // Wait for the job page to load
          console.log('waiting over');

          // Scrape the required job data
          cy.document().then((doc) => {
            // Debugging: Ensure document is loaded
            if (!doc) {
              throw new Error('Document not loaded');
            }

            const getTextFromLabel = (label) => {
              const labelElement = doc.querySelector(
                `.posting-categories .${label}`
              );
              console.log('labelelement: ' + labelElement);
              return labelElement ? labelElement.innerText.trim() : '';
            };

            const cleanHTML = (html) => {
              return html
                .replace(/\n/g, '') // Remove newlines
                .replace(/ dir="ltr"/g, '') // Remove dir="ltr" attributes
                .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
                .replace(/\s\s+/g, ' ') // Remove extra spaces
                .trim(); // Trim leading/trailing spaces
            };

            const jobDescriptionHTML = doc.querySelector(
              '[data-qa="job-description"]'
            ).innerHTML;
            const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

            const jobTitleElement = doc.querySelector('h2.posting-headline');
            const jobTitle = jobTitleElement?.innerText || 'Unknown Title';

            const departmentElement = doc.querySelector(
              '.posting-categories .department'
            );
            const department = departmentElement
              ? departmentElement.innerText
              : 'Unknown Department';
            const mappedCategory = mapDepartmentToCategory(department);

            const jobTypeElement = doc.querySelector(
              '.posting-categories .commitment'
            );
            const jobType = jobTypeElement
              ? jobTypeElement.innerText.replace(/\/$/, '').trim()
              : 'Unknown Job Type';

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Charity: Water',
              },
              jobTitle: jobTitle,
              category: mappedCategory,
              jobDescription: cleanedJobDescription, // Use the cleaned HTML
              jobType: jobType,
              locationInfo: {
                location: 'Remote', // Assuming this from the working policy
                onSiteLocation: [getTextFromLabel('location')], // Extracting Location
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

            // Submit the job data to the backend
            checkAndSubmitJob(jobData);
          });
        });
      });
  });
});
