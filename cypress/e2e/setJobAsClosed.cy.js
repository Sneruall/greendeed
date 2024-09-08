describe('Check Job Apply URLs and Mark Closed', () => {
  const jobApiUrl = 'https://greendeed.io/api/job'; // Fully qualified API endpoint to mark a job as closed
  const fetchActiveJobsUrl = 'https://greendeed.io/api/get-apply-urls'; // Fully qualified API endpoint to fetch all active jobs

  it('Fetches active jobs and checks the apply URLs', () => {
    // Step 1: Fetch all active jobs
    cy.request(fetchActiveJobsUrl).then((response) => {
      expect(response.status).to.eq(200);

      // Step 2: Parse the list of apply URLs from the response
      const applyUrls = response.body.split('\n');

      // Step 3: Add an invalid URL to the list for testing purposes
      applyUrls.push('https://greendeed.io/non-existing-page'); // Adding a known invalid URL

      // Step 4: Loop through each apply URL and check its status code
      applyUrls.forEach((url) => {
        if (!url) return; // Skip empty URLs if any

        cy.request({
          url,
          failOnStatusCode: false, // Prevent Cypress from failing on non-2xx status codes
        }).then((res) => {
          const isUrlInvalid = !res.status.toString().startsWith('2');

          // Step 5: If URL status is not 2xx, fetch job details and mark as closed
          if (isUrlInvalid) {
            // Ensure the URL is fully qualified when requesting the job API
            cy.request(`${jobApiUrl}?apply=${encodeURIComponent(url)}`).then(
              (jobResponse) => {
                expect(jobResponse.status).to.eq(200);
                const jobData = jobResponse.body[0]; // Assuming the response returns an array with job data

                if (jobData && jobData.id) {
                  cy.request('PATCH', `${jobApiUrl}?id=${jobData.id}`, {
                    closed: true,
                  }).then((patchResponse) => {
                    expect(patchResponse.status).to.eq(201);
                    cy.log(
                      `Job ${jobData.id} marked as closed due to invalid URL: ${url}`
                    );
                  });
                } else {
                  cy.log(
                    `No job found with the apply URL: ${url}, skipping...`
                  );
                }
              }
            );
          } else {
            // Step 6: Log that the job is still valid
            cy.log(`Job with apply URL ${url} is still valid.`);
          }
        });
      });
    });
  });
});
