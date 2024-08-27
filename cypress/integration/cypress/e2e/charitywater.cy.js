import { mapDepartmentToCategory } from '../scripts/categories.ts';
import { checkAndSubmitJob } from '../scripts/jobUtilities.ts';

describe('Scrape job positions and extract details from Cleanhub', () => {
  const jobLinks = [];

  it('Retrieve job position links from Cleanhub', () => {
    cy.visit('https://cleanhub.factorialhr.de/embed/jobs');
    cy.wait(5000); // Wait for the page to load fully

    // Get all job position links
    cy.get('.job-offer-item a[href*="/job_posting/"]')
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

            const cleanHTML = (html) => {
              return html
                .replace(/\n/g, '') // Remove newlines
                .replace(/ dir="ltr"/g, '') // Remove dir="ltr" attributes
                .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
                .replace(/\s\s+/g, ' ') // Remove extra spaces
                .trim(); // Trim leading/trailing spaces
            };

            const jobDescriptionElement = doc.querySelector('.styledText');
            const jobDescriptionHTML = jobDescriptionElement
              ? jobDescriptionElement.innerHTML
              : 'No description available';
            const cleanedJobDescription = cleanHTML(jobDescriptionHTML);

            const jobTitleElement = doc.querySelector('h1');
            const jobTitle =
              jobTitleElement?.innerText.trim() || 'Unknown Title';

            console.log('job title = ' + jobTitle);

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

            const locationElement = doc.querySelector(
              'li:nth-child(3) span.inline-block.align-middle'
            );
            const location =
              locationElement?.innerText.trim() || 'Unknown Location';

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Cleanhub',
              },
              jobTitle: jobTitle,
              category: mappedCategory,
              jobDescription: cleanedJobDescription, // Use the cleaned HTML
              jobType: jobType,
              locationInfo: {
                location: location.includes('Hybrid') ? 'Hybrid' : 'Remote', // Assuming hybrid or remote
                onSiteLocation: [location], // Extracting Location
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
