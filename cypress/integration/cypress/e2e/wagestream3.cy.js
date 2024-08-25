describe('Scrape job positions and extract details', () => {
  const jobLinks = [];
  const submittedJobs = new Set(); // Track already submitted jobs

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

            const jobTitle = doc.querySelector('h1').innerText; // Assuming the job title is in the <h1> tag
            const externalJobId = `wagestream_${jobTitle
              .replace(/\s+/g, '_')
              .toLowerCase()}`;

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Wagestream',
              },
              jobTitle: jobTitle,
              category: {
                id: 26, // You can update this with the appropriate ID if available
                name: getTextFromLabel('Department'), // Extracting Department
                slug: getTextFromLabel('Department')
                  ?.toLowerCase()
                  .replace(/\s+/g, '-'),
              },
              jobDescription: cleanedJobDescription, // Use the cleaned HTML
              jobType: 'Full-time', // Update dynamically if needed
              salary: {
                currency: '£',
                period: 'Annual',
                min: {
                  float: 85000, // You would extract this dynamically if needed
                  formatted: '85,000',
                  value: 85000,
                },
                max: {
                  float: 100000, // Extract this dynamically if needed
                  formatted: '100,000',
                  value: 100000,
                },
                string: '',
              },
              locationInfo: {
                location: 'Hybrid', // Assuming this from the working policy
                onSiteLocation: [getTextFromLabel('Locations')], // Extracting Location
              },
              email: 'laurens@vr-house.nl', // Replace with your email if necessary
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
              externalJobId: externalJobId, // Store the external job ID for internal checks
              coupon: '',
              invoiceInfo: {},
            };

            // Check if a job with the same apply URL already exists
            cy.request({
              method: 'GET',
              url: `/api/job?apply=${encodeURIComponent(jobData.apply)}`,
            }).then((response) => {
              if (response.status === 200 && response.body.length > 0) {
                cy.log(
                  `Job with the same apply URL already exists: ${jobTitle}`
                );
                return;
              }

              // Create a unique filename for each job, including the timestamp
              const fileName = `job_${jobTitle
                .replace(/\s+/g, '_')
                .toLowerCase()}_${Date.now()}.json`;
              cy.writeFile(`cypress/fixtures/${fileName}`, jobData);

              // Automatically post the job data to the server
              cy.request('POST', '/api/autopost', jobData).then((response) => {
                if (response.status === 201) {
                  cy.log(`Job submitted successfully: ${jobTitle}`);
                  submittedJobs.add(externalJobId); // Mark job as submitted
                } else {
                  cy.log(`Failed to submit job: ${jobTitle}`);
                }
              });
            });
          });
        });
      });
  });
});
