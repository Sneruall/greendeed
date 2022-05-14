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
