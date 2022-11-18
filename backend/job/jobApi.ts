import { customAlphabet } from 'nanoid';
import { jobCategoriesList, jobCategory } from '../../types/jobCategories';
import { Form, Job } from '../../types/types';
import { convertCommaSeparatedStringToArray } from '../../helpers/arrayConversions';
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';

/* Creating a random string of 7 characters from the alphabet. */
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 7);

/**
 * It returns the current timestamp in milliseconds
 * @returns A function that returns the current time in milliseconds.
 */
export const registerJobTimestamp = () => {
  return new Date().getTime();
};

export const setJobId = () => {
  return nanoid();
};

export const setDefaultJobAttributes = (formData: Form) => {
  // Set other job data attributes
  formData.sdg = ['1'];
  formData.timestamp = registerJobTimestamp();
  formData.id = setJobId();
  formData.price = 50; // set the price
  formData.paid = true; // set the payment status
  formData.hidden = false; // determine if the job is hidden from the platform overal
  formData.listed = true; // determine if the job is listed in the jobs lists
  formData.closed = false; // determine if the job is marked as closed
  formData.external = false; // determine if the job is external (e.g. from remotive)
};

export const convertLocationsToArrays = (formData: Form) => {
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
  formData: Form,
  descriptionHtml: string,
  descriptionType: 'job' | 'company'
) => {
  if (descriptionType === 'job') {
    formData.jobDescription = descriptionHtml;
  }
  if (descriptionType === 'company') {
    formData.companyData.description = descriptionHtml;
  }
};

export const setCompanyId = (
  formData: Form,
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

export async function mapCategoryToObject(formData: Form) {
  formData.category = createCategoryObject(
    formData.category as unknown as string
  )!;
}

export async function setLogo(
  formData: Form,
  imagePublicId: string,
  retrievedLogo: string | undefined
) {
  if (imagePublicId || retrievedLogo) {
    formData.companyData.logo = imagePublicId || retrievedLogo;
  }
}

/**
 * It takes a category name as a string and returns the corresponding jobCategory object
 * @param category - jobCategory['name']
 * @returns An object with the name and color of the category.
 */
const createCategoryObject = (category: jobCategory['name']) => {
  return jobCategoriesList.find((jobCategory) => jobCategory.name === category);
};
export async function setSalary(
  formData: Form,
  salaryValues: {
    minSalary: CurrencyInputOnChangeValues;
    maxSalary: CurrencyInputOnChangeValues;
  }
) {
  if (salaryValues.minSalary) {
    formData.salary!.min = salaryValues.minSalary;
  }
  if (salaryValues.maxSalary) {
    formData.salary!.max = salaryValues.maxSalary;
  }
}

export async function postJob(formData: Form) {
  // Post the job data in the Database
  //todo no console log and nothing is done with data?

  const response = await fetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(formData), //todo only save what we need, like postCompany does, convert Form to Job.
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}
