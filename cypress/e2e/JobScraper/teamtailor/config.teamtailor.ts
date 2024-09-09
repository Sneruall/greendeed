const linkSelectorsTeamtailor = ['a[href*="/jobs/"]'];

// Selectors for Teamtailor
const jobDetailSelectorsTeamtailor = {
  jobDescription: ['.prose'],
  jobTitle: ['h1.font-company-header span.textFitted'],
  jobType: ['p', '.styles_jobs__column-type__FYVII', '.commitment'], //e.g. full-time
  location: ['.location', '.job__header p.body--metadata', '.workplaceTypes'],
  department: ['.department'],
};

export const teamtailorConfigs = {
  // wagestream: {
  //   name: 'Wagestream',
  //   url: 'https://wagestream.com/en/careers#job-vacancies',
  //   hrTool: 'teamtailor',
  //   selectors: linkSelectorsTeamtailor,
  //   jobDetails: jobDetailSelectorsTeamtailor,
  // },
  fjallraven: {
    name: 'Fjallraven',
    url: 'https://career.fjallraven.com/jobs',
    hrTool: 'teamtailor',
    selectors: linkSelectorsTeamtailor,
    jobDetails: jobDetailSelectorsTeamtailor,
  },

  // Add more companies as needed
};
