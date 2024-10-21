// config.workable.ts
const linkSelectorsworkable = ['[data-ui="job-opening"] a'];

const jobDetailSelectorsworkable = {
  jobDescription: [
    '[data-ui="job-description"]',
    '.styles--3vx-H',
    '#job-description-title + div',
  ],
  jobTitle: ['h1[data-ui="job-title"]', '.styles--2MSa5 h1', 'header h1'],
  jobType: ['span[data-ui="job-type"]', 'p span.styles--2kqW6'],
  location: ['[data-ui="job-location"] span', '.styles--11q6G'],
  department: ['span[data-ui="job-department"]', 'p span.styles--2kqW6'],
  workplace: ['[data-ui="job-workplace"]'],
};

export const workableConfigs = {
  // recycleye: {
  //   name: 'Recycleye',
  //   url: 'https://apply.workable.com/recycleye/',
  //   hrTool: 'workable',
  //   selectors: linkSelectorsworkable,
  //   jobDetails: jobDetailSelectorsworkable,
  // },
  // loam: {
  //   name: 'Loam Bio',
  //   url: 'https://apply.workable.com/loam-bio/',
  //   hrTool: 'workable',
  //   selectors: linkSelectorsworkable,
  //   jobDetails: jobDetailSelectorsworkable,
  // },
  wck: {
    name: 'World Central Kitchen',
    url: 'https://apply.workable.com/world-central-kitchen',
    hrTool: 'workable',
    selectors: linkSelectorsworkable,
    jobDetails: jobDetailSelectorsworkable,
  },
};
