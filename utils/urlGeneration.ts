import { WithId } from 'mongodb';
import { Company, Job } from '../types/types';
import {
  replaceCharactersByWhitespace,
  replaceCharactersByDash,
} from './stringManipulations';

export const generateJobUrl = (
  companyName: string,
  jobTitle: string,
  id: string
) => {
  return `/metaverse-jobs/${replaceCharactersByDash(
    companyName
  )}/${replaceCharactersByDash(jobTitle)}-${id}`;
};

export const generateCompanyUrl = (name: string, id: string) => {
  return `/metaverse-companies/${replaceCharactersByDash(name)}-${id}`;
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
    replaceCharactersByWhitespace(job.jobTitle.toLowerCase()) !==
      replaceCharactersByWhitespace(queryTitle!) ||
    replaceCharactersByWhitespace(job.companyName.toLowerCase()) !==
      replaceCharactersByWhitespace(queryCompany)
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

export const slugIsEqualToCompany = (
  company: Company,
  queryId: string,
  slug: string | string[]
) => {
  const name = slug.toString().replace('-' + queryId, '');

  console.log(company.name.toLowerCase(), name);
  if (
    replaceCharactersByWhitespace(company.name.toLowerCase()) !==
    replaceCharactersByWhitespace(name)
  ) {
    console.log('not the same');
    return false;
  } else {
    return true;
  }
};

export const redirectToCorrectCompanyUrl = (company: Company) => {
  return {
    redirect: {
      permanent: false,
      destination: generateCompanyUrl(company.name.toLowerCase(), company.id),
    },
    props: {},
  };
};
