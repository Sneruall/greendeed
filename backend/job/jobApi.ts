import { customAlphabet } from 'nanoid';
import { jobCategoriesList, jobCategory } from '../../types/jobCategories';
import { Job } from '../../types/types';
import { convertCommaSeparatedStringToArray } from '../../helpers/arrayConversions';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7); //prevent use of dashes (conflicts in url)

export const registerJobTimestamp = () => {
  return new Date().getTime(); //to log the timestamp the form was submitted (ms since 1 jan 1970)
};

export const setJobId = () => {
  return nanoid();
};

export const setDefaultJobAttributes = (formData: Job) => {
  // Set other job data attributes
  formData.timestamp = registerJobTimestamp();
  formData.id = setJobId();
  formData.sdg = ['1', '2', '3'];
  formData.price = 50; // set the price
  formData.paid = true; // set the payment status
  formData.hidden = false; // set the visibility
  formData.listed = true;
  formData.closed = false;
  formData.external = true;
  if (formData.locationInfo.location === 'onSite') {
    formData.locationInfo.remoteLocation = undefined;
  }
};

export const createCategoryObject = (category: jobCategory['name']) => {
  return jobCategoriesList.find((jobCategory) => jobCategory.name === category);
};

export const convertTagsAndLocations = (formData: Job) => {
  if (formData.tags) {
    formData.tags = convertCommaSeparatedStringToArray(formData.tags);
  }
  if (formData.locationInfo.onSiteLocation) {
    formData.locationInfo.onSiteLocation = convertCommaSeparatedStringToArray(
      formData.locationInfo.onSiteLocation
    );
  }
  if (formData.locationInfo.geoRestrictionOther) {
    formData.locationInfo.geoRestrictionOther =
      convertCommaSeparatedStringToArray(
        formData.locationInfo.geoRestrictionOther
      );
  }
};

export const setHTMLDescription = (
  formData: Job,
  descriptionHtml: string,
  descriptionType: 'job' | 'company'
) => {
  if (descriptionType === 'job') {
    formData.jobDescription = descriptionHtml;
  }
  if (descriptionType === 'company') {
    formData.companyDescription = descriptionHtml;
  }
};

export const setCompanyId = (
  formData: Job,
  retrievedCompanyId: Job['companyId'] | undefined
) => {
  // Check if the company already exists in the database
  // If it exists take over the id and assign it to the job posting
  if (retrievedCompanyId) {
    formData.companyId = retrievedCompanyId;
  } else {
    // If it does not exist:
    formData.companyId = nanoid();
  }
};

export async function postJob(formData: Job) {
  // Post the job data in the Database
  //todo no console log and nothing is done with data?
  const response = await fetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}
