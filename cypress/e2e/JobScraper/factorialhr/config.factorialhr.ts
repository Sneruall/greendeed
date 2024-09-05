const linkSelectorsFactorialhr = ['.job-offer-item a[href*="/job_posting/"]'];

// Selectors for factorialHR
const jobDetailSelectorsFactorialhr = {
  jobDescription: ['.styledText'],
  jobTitle: ['h1'],
  jobType: ['li:nth-child(2) span.inline-block.align-middle'], //e.g. full-time
  location: ['li:nth-child(3) span.inline-block.align-middle'],
  department: ['li:nth-child(4) span.inline-block.align-middle'],
};

export const factorialhrConfigs = {
  cleanhub: {
    name: 'Cleanhub',
    url: 'https://cleanhub.factorialhr.de/embed/jobs',
    hrTool: 'factorialhr',
    selectors: linkSelectorsFactorialhr,
    jobDetails: jobDetailSelectorsFactorialhr,
  },
  // Add more companies as needed
};
