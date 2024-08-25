describe('Scrape job positions and extract details', () => {
  const jobLinks = [];
  const submittedJobs = new Set(); // Track already submitted jobs

  // Predefined job categories list todo: can we import this somehow from our jobCategories.ts file in our types folder?
  const jobCategoriesList = [
    {
      id: 1,
      name: 'Accounting and Finance',
      slug: 'accounting-and-finance',
    },
    {
      id: 2,
      name: 'Administration and Office Support',
      slug: 'administration-and-office-support',
    },
    {
      id: 3,
      name: 'Advertising and Marketing',
      slug: 'advertising-and-marketing',
    },
    {
      id: 4,
      name: 'Architecture and Engineering',
      slug: 'architecture-and-engineering',
    },
    {
      id: 5,
      name: 'Art, Fashion, and Design',
      slug: 'art-fashion-and-design',
    },
    {
      id: 6,
      name: 'Business Operations and Management',
      slug: 'business-operations-and-management',
    },
    {
      id: 7,
      name: 'Consulting and Project Management',
      slug: 'consulting-and-project-management',
    },
    {
      id: 8,
      name: 'Customer Service and Support',
      slug: 'customer-service-and-support',
    },
    {
      id: 9,
      name: 'Data Science and Analytics',
      slug: 'data-science-and-analytics',
    },
    {
      id: 10,
      name: 'Education and Training',
      slug: 'education-and-training',
    },
    {
      id: 11,
      name: 'Environmental and Agriculture',
      slug: 'environmental-and-agriculture',
    },
    {
      id: 12,
      name: 'Health and Wellness',
      slug: 'health-and-wellness',
    },
    {
      id: 13,
      name: 'Hospitality and Tourism',
      slug: 'hospitality-and-tourism',
    },
    {
      id: 14,
      name: 'Human Resources',
      slug: 'human-resources',
    },
    {
      id: 15,
      name: 'Information Technology and Computer Science',
      slug: 'information-technology-and-computer-science',
    },
    {
      id: 16,
      name: 'Legal',
      slug: 'legal',
    },
    {
      id: 17,
      name: 'Logistics and Transportation',
      slug: 'logistics-and-transportation',
    },
    {
      id: 18,
      name: 'Manufacturing and Production',
      slug: 'manufacturing-and-production',
    },
    {
      id: 19,
      name: 'Media and Communication',
      slug: 'media-and-communication',
    },
    {
      id: 20,
      name: 'Military and Government',
      slug: 'military-and-government',
    },
    {
      id: 21,
      name: 'Nonprofit and Social Services',
      slug: 'nonprofit-and-social-services',
    },
    {
      id: 22,
      name: 'Nursing and Healthcare',
      slug: 'nursing-and-healthcare',
    },
    {
      id: 23,
      name: 'Photography, Video, and Animation',
      slug: 'photography-video-and-animation',
    },
    {
      id: 24,
      name: 'Real Estate and Property Management',
      slug: 'real-estate-and-property-management',
    },
    {
      id: 25,
      name: 'Retail and Consumer Goods',
      slug: 'retail-and-consumer-goods',
    },
    {
      id: 26,
      name: 'Sales and Marketing',
      slug: 'sales-and-marketing',
    },
    {
      id: 27,
      name: 'Science and Research',
      slug: 'science-and-research',
    },
    {
      id: 28,
      name: 'Social Media and Marketing',
      slug: 'social-media-and-marketing',
    },
    {
      id: 29,
      name: 'Software Development',
      slug: 'software-development',
    },
    {
      id: 30,
      name: 'Sports and Entertainment',
      slug: 'sports-and-entertainment',
    },
    {
      id: 31,
      name: 'Technical Writing and Translation',
      slug: 'technical-writing-and-translation',
    },
    {
      id: 32,
      name: 'Telecommunications and Networking',
      slug: 'telecommunications-and-networking',
    },
    {
      id: 33,
      name: 'Travel and Hospitality',
      slug: 'travel-and-hospitality',
    },
    {
      id: 34,
      name: 'Web and Mobile Development',
      slug: 'web-and-mobile-development',
    },
    {
      id: 35,
      name: 'Other',
      slug: 'other',
    },
  ];

  // Function to map department name to job category
  const mapDepartmentToCategory = (department) => {
    const lowerCasedDepartment = department.toLowerCase();
    return (
      jobCategoriesList.find((category) =>
        lowerCasedDepartment.includes(category.name.toLowerCase())
      ) || {
        id: 35,
        name: 'Other', // If no match, return the department as is
        slug: 'other',
      }
    );
  };

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

            const jobData = {
              companyId: '', // Auto-generated in the backend
              companyData: {
                name: 'Wagestream',
              },
              jobTitle: jobTitle,
              category: mappedCategory, // Use the mapped category
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
              coupon: '',
              invoiceInfo: {},
            };

            // Create a unique filename for each job, including the timestamp
            const fileName = `wagestream_${jobTitle
              .replace(/\s+/g, '_')
              .toLowerCase()}_${Date.now()}.json`;
            cy.writeFile(`cypress/fixtures/${fileName}`, jobData);

            // Automatically post the job data to the server
            // cy.request('POST', '/api/autopost', jobData).then((response) => {
            //   if (response.status === 201) {
            //     cy.log(`Job submitted successfully: ${jobTitle}`);
            //   } else {
            //     cy.log(`Failed to submit job: ${jobTitle}`);
            //   }
            // });
            // });
          });
        });
      });
  });
});
