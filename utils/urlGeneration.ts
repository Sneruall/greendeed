import { WithId } from 'mongodb';
import { Job } from '../types/types';
import {
  replaceDashAndSlashByWhitespace,
  replaceWhitespaceAndSlashesByDash,
} from './stringManipulations';

export const generateJobUrl = (
  companyName: string,
  jobTitle: string,
  id: string
) => {
  return `/metaverse-jobs/${replaceWhitespaceAndSlashesByDash(
    companyName
  )}/${replaceWhitespaceAndSlashesByDash(jobTitle)}-${id}`;
};

export const generateCompanyUrl = (name: string, id: string) => {
  return `/metaverse-companies/${replaceWhitespaceAndSlashesByDash(
    name
  )}-${id}`;
};

export const matchSlugToJob = (
  job: Job,
  slug: string | string[],
  queryId: string
) => {
  const slugMinusQueryId = slug.toString().replace('-' + queryId, '');
  const queryTitle = slugMinusQueryId.split(',').pop();
  const queryCompany = slugMinusQueryId.replace(',' + queryTitle, '');

  // if the id is found, but slug (company name and/or job title) is not matching the one from the database, redirect to the currect url.
  // Replace Dashes and slashes by whitespaces in the slug (because these are not in the db), but also remove them from DB, because if it has any it should also be removed for the comparison
  if (
    replaceDashAndSlashByWhitespace(job.jobTitle.toLowerCase()) !==
      replaceDashAndSlashByWhitespace(queryTitle!) ||
    replaceDashAndSlashByWhitespace(job.companyName.toLowerCase()) !==
      replaceDashAndSlashByWhitespace(queryCompany)
  ) {
    return {
      redirect: {
        permanent: false,
        destination: generateJobUrl(
          job.companyName.toLowerCase(),
          job.jobTitle.toLowerCase(),
          job.id
        ),
      },
      props: {},
    };
  } else {
    return { props: { job: JSON.parse(JSON.stringify(job)) } };
  }
};
