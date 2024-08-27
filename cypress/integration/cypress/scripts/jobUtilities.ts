// jobUtilities.ts

import { Job } from '../../../../types/types'; // Make sure to import necessary types

export const checkAndSubmitJob = (jobData: Job) => {
  cy.request({
    method: 'GET',
    url: `http://localhost:3000/api/job?apply=${encodeURIComponent(
      jobData.apply
    )}`,
  }).then((response) => {
    if (response.status === 200 && response.body.length > 0) {
      cy.log(`Job with the same apply URL already exists: ${jobData.jobTitle}`);
      return;
    }

    // Create a unique filename for each job, including the timestamp

    const fileName = `${jobData.companyData.name}_${jobData.jobTitle
      .replace(/\s+/g, '_')
      .toLowerCase()}_${Date.now()}.json`;
    cy.writeFile(`cypress/fixtures/${fileName}`, jobData);

    // Automatically post the job data to the server
    //     cy.request('POST', 'http://localhost:3000/api/autopost', jobData).then(
    //       (response) => {
    //         if (response.status === 201) {
    //           cy.log(`Job submitted successfully: ${jobTitle}`);
    //         } else {
    //           cy.log(`Failed to submit job: ${jobTitle}`);
    //         }
    //       }
    //     );
  });
};
