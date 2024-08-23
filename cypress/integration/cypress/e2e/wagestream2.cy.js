describe('Scrape job positions and extract details', () => {
  const jobLinks = [];

  it('Retrieve job position links', () => {
    cy.visit(
      'https://wagestream.com/en/careers?hsCtaTracking=2e3f3be1-a050-4aea-8d35-50455250ad26%7C30a7817a-95c9-4854-ac10-244255372b44#job-vacancies'
    );
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

            const jobData = {
              companyId: '',
              companyData: {
                name: 'Wagestream',
              },
              jobTitle: doc.querySelector('h1').innerText, // Assuming the job title is in the <h1> tag
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
              email: 'your-email@example.com', // Replace with your email if necessary
              fullName: 'Your Full Name', // Replace with your full name
              timestamp: Date.now(),
              id: '',
              price: 0,
              paid: true,
              published: false,
              listed: true,
              closed: false,
              applicationMethod: 'website',
              apply: link,
              external: false,
              coupon: '',
              invoiceInfo: {},
            };

            // Create a unique filename for each job, including the timestamp
            const fileName = `job_${jobData.jobTitle
              .replace(/\s+/g, '_')
              .toLowerCase()}_${Date.now()}.json`;
            cy.writeFile(`cypress/fixtures/${fileName}`, jobData);
          });
        });
      });
  });
});
