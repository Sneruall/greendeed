import { Job } from 'customtypes/job/Job';
import { WithId } from 'mongodb';
import { Company } from '../customtypes/types';
import {
  replaceCharactersByWhitespace,
  replaceCharactersByDash,
} from './stringManipulations';

var accents = require('remove-accents');

export const generateJobUrl = (
  companyName: string,
  jobTitle: string,
  id: string
) => {
  return `/metaverse-jobs/${replaceCharactersByDash(
    accents.remove(companyName)
  )}/${replaceCharactersByDash(accents.remove(jobTitle))}-${id}`;
};

export const generateCompanyUrl = (name: string, id: string) => {
  return `/metaverse-companies/${replaceCharactersByDash(
    accents.remove(name)
  )}-${id}`;
};

export const slugIsEqualToJob = (
  job: Job,
  slug: string | string[],
  queryId: string
) => {
  const slugMinusQueryId = slug.toString().replace('-' + queryId, '');
  const queryTitle = slugMinusQueryId.split(',').pop();
  const queryCompany = slugMinusQueryId.replace(',' + queryTitle, '');
  // console.log('querytitle: ' + replaceCharactersByWhitespace(queryTitle!));
  // console.log(
  //   'querytitle: ' +
  //     replaceCharactersByWhitespace(accents.remove(job.jobTitle.toLowerCase()))
  // );
  // console.log('querycompany: ' + replaceCharactersByWhitespace(queryCompany));
  // console.log(
  //   'querycompany: ' +
  //     replaceCharactersByWhitespace(
  //       accents.remove(job.companyData.name.toLowerCase())
  //     )
  // );

  if (
    replaceCharactersByWhitespace(
      accents.remove(job.jobTitle.toLowerCase())
    ) !== replaceCharactersByWhitespace(queryTitle!) ||
    replaceCharactersByWhitespace(
      accents.remove(job.companyData.name.toLowerCase())
    ) !== replaceCharactersByWhitespace(queryCompany)
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
        job.companyData.name.toLowerCase(),
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
