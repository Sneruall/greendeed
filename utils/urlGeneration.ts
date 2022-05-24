import { replaceWhitespaceByDash } from './stringManipulations';

export const generateJobUrl = (
  organizationName: string,
  jobTitle: string,
  id: string
) => {
  return `/metaverse-jobs/${replaceWhitespaceByDash(
    organizationName
  )}/${replaceWhitespaceByDash(jobTitle)}-${id}`;
};

export const generateCompanyUrl = (name: string, id: string) => {
  return `/metaverse-companies/${replaceWhitespaceByDash(name)}-${id}`;
};
