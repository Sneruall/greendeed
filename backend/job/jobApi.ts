import { customAlphabet } from 'nanoid';
import { Job } from '../../types/types';

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
  formData.price = 50; // set the price
  formData.paid = true; // set the payment status
  formData.hidden = false; // set the visibility
  formData.listed = true;
  if (formData.location === 'onSite') {
    formData.remoteLocation = undefined;
  }
};

// TODO: merge convertTags and convertOnSiteLocation functions (repeats code)

export const convertTags = (formData: Job) => {
  //todo account for entries like: holland,germany,    or ,holland, germany,,,
  if (formData.tags.includes(',')) {
    // @ts-ignore: tags are entered as a string at first and then converted into array
    const commaSeparatedTags = formData.tags.replace(/\s*,\s*/g, ',');
    formData.tags = commaSeparatedTags.split(',').filter((a: string) => a); //splitsen op de comma en filteren op undefined or null elements in array
  }
};

//todo: refactor here, two functions below eachother very similar
export const convertOnSiteLocation = (formData: Job) => {
  //todo account for entries like: holland,germany,    or ,holland, germany,,,
  if (formData.onSiteLocation && formData.onSiteLocation.includes(',')) {
    // @ts-ignore: tags are entered as a string at first and then converted into array
    const commaSeparatedLocations = formData.onSiteLocation.replace(
      /\s*,\s*/g,
      ','
    );
    formData.onSiteLocation = commaSeparatedLocations
      .split(',')
      .filter((a: string) => a);
  }
};

export const convertOtherGeoRestriction = (formData: Job) => {
  //todo account for entries like: holland,germany,    or ,holland, germany,,,
  if (
    formData.geoRestrictionOther &&
    formData.geoRestrictionOther.includes(',')
  ) {
    // @ts-ignore: tags are entered as a string at first and then converted into array
    const commaSeparatedLocations = formData.geoRestrictionOther.replace(
      /\s*,\s*/g,
      ','
    );
    formData.geoRestrictionOther = commaSeparatedLocations
      .split(',')
      .filter((a: string) => a);
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
