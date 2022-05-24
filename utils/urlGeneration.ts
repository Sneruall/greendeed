import { replaceWhitespaceByDash } from './stringManipulations';

export const generateJobUrl = (
  companyName: string,
  jobTitle: string,
  id: string
) => {
  return `/metaverse-jobs/${replaceWhitespaceByDash(
    companyName
  )}/${replaceWhitespaceByDash(jobTitle)}-${id}`;
};

export const generateCompanyUrl = (name: string, id: string) => {
  return `/metaverse-companies/${replaceWhitespaceByDash(name)}-${id}`;
};
