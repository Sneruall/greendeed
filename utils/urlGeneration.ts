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

export const slugIsEqualToJob = (
  job: Job,
  slug: string | string[],
  queryId: string
) => {
  const slugMinusQueryId = slug.toString().replace('-' + queryId, '');
  const queryTitle = slugMinusQueryId.split(',').pop();
  const queryCompany = slugMinusQueryId.replace(',' + queryTitle, '');

  if (
    replaceCharactersByWhitespace(job.jobTitle.toLowerCase()) !==
      replaceCharactersByWhitespace(queryTitle!) ||
    replaceCharactersByWhitespace(job.companyName.toLowerCase()) !==
      replaceCharactersByWhitespace(queryCompany)
  ) {
    return false;
  } else {
    return true;
  }
};

export const redirectToCorrectJobUrl = (job: Job) => {
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
};

export const slugIsEqualToCompany = (
  company: Company,
  queryId: string,
  slug: string | string[]
) => {
  const name = slug.toString().replace('-' + queryId, '');

  if (
    replaceCharactersByWhitespace(company.name.toLowerCase()) !==
    replaceCharactersByWhitespace(name)
  ) {
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
