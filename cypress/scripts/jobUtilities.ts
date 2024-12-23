import { Job } from '../../types/types';

// Function to check if a job already exists in the database
export const checkJobExists = (jobData: Job) => {
  return cy.request({
    method: 'GET',
    // url: `http://localhost:3000/api/job?apply=${encodeURIComponent(
    //   jobData.apply
    // )}`,
    url: `https://greendeed.io/api/job?apply=${encodeURIComponent(
      jobData.apply
    )}`,
  });
};

// Function to submit a job if it doesn't already exist
export const submitJob = (jobData: Job) => {
  const fileName = `${jobData.companyData.name}_${jobData.jobTitle
    .replace(/\s+/g, '_')
    .toLowerCase()}_${Date.now()}.json`;
  cy.writeFile(`cypress/fixtures/${fileName}`, jobData);

  cy.request('POST', 'https://greendeed.io/api/autopost', jobData).then(
    (response) => {
      if (response.status === 201) {
        cy.log(`Job submitted successfully: ${jobData.jobTitle}`);
      } else {
        cy.log(`Failed to submit job: ${jobData.jobTitle}`);
      }
    }
  );

  // Uncomment the following line to submit jobs to the local database instead of the production database
  // cy.request('POST', 'http://localhost:3000/api/autopost', jobData).then(
  //   (response) => {
  //     if (response.status === 201) {
  //       cy.log(`Job submitted successfully: ${jobData.jobTitle}`);
  //     } else {
  //       cy.log(`Failed to submit job: ${jobData.jobTitle}`);
  //     }
  //   }
  // );
};
