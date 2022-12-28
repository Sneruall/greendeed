import { customAlphabet } from 'nanoid';
import { jobCategoriesList, jobCategory } from '../../types/jobCategories';
import { Company, Form, Job, LocationInfo, sdgList } from '../../types/types';
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

/**
 * It transforms the form data into a job object
 * @param {Form} retrievedFormData - Form
 * @param {string} jobDescriptionHtml - string,
 * @param {string} companyDescriptionHtml - string
 * @param salaryValues - {
 * @param {Company} [retrievedCompanyData] - Company | undefined
 * @param {string} [imagePublicId] - the public id of the image that was uploaded to cloudinary
 * @returns The result of the function is a Job object.
 */
export async function transformFormData(
  retrievedFormData: Form,
  jobDescriptionHtml: string,
  companyDescriptionHtml: string,
  salaryValues: {
    minSalary: CurrencyInputOnChangeValues;
    maxSalary: CurrencyInputOnChangeValues;
  },
  retrievedCompanyData?: Company,
  imagePublicId?: string
) {
  let result: Job = {
    category: retrievedFormData.category,
    email: retrievedFormData.email,
    apply: retrievedFormData.apply,
    applicationMethod: retrievedFormData.applicationMethod,
    companyId: setCompanyId(retrievedCompanyData?.id),
    jobTitle: retrievedFormData.jobTitle,
    jobDescription: retrievedFormData.jobDescription,
    jobType: retrievedFormData.jobType,
    id: setJobId(),
    price: 50,
    paid: true,
    closed: false,
    external: false,
    hidden: false,
    listed: true,
    locationInfo: retrievedFormData.locationInfo,
    timestamp: registerJobTimestamp(),
    salary: retrievedFormData.salary,
    companyData: retrievedFormData.companyData,
    sdg: ['1'],
  };
  // todo: checken of deze functies wel async moeten worden gemarked...
  convertLocationsToArrays(result.locationInfo);
  mapCategoryToObject(result.category);
  setLogo(result, imagePublicId, retrievedCompanyData?.logo);
  setHTMLDescription(result, jobDescriptionHtml, 'job');
  setHTMLDescription(result, companyDescriptionHtml, 'company');
  setSalary(result, salaryValues);
  // result.companyData.sdgs = filterSdgData(retrievedFormData);

  return result;
}

export const setDefaultJobAttributes = (retrievedFormData: Form) => {
  // Set other job data attributes
  retrievedFormData.sdg = ['1'];
  retrievedFormData.timestamp = registerJobTimestamp();
  retrievedFormData.id = setJobId();
  retrievedFormData.price = 50; // set the price
  retrievedFormData.paid = true; // set the payment status
  retrievedFormData.hidden = false; // determine if the job is hidden from the platform overal
  retrievedFormData.listed = true; // determine if the job is listed in the jobs lists
  retrievedFormData.closed = false; // determine if the job is marked as closed
  retrievedFormData.external = false; // determine if the job is external (e.g. from remotive)
};

export const convertLocationsToArrays = (locationInfo: LocationInfo) => {
  if (locationInfo.onSiteLocation) {
    locationInfo.onSiteLocation = convertCommaSeparatedStringToArray(
      locationInfo.onSiteLocation
    );
  }
  if (locationInfo.geoRestrictionOther) {
    locationInfo.geoRestrictionOther = convertCommaSeparatedStringToArray(
      locationInfo.geoRestrictionOther
    );
  }
};

export const setHTMLDescription = (
  result: Job,
  descriptionHtml: string,
  descriptionType: 'job' | 'company'
) => {
  if (descriptionType === 'job') {
    result.jobDescription = descriptionHtml;
  }
  if (descriptionType === 'company') {
    result.companyData.description = descriptionHtml;
  }
};

export const setCompanyId = (
  retrievedCompanyId: Job['companyId'] | undefined
) => {
  // Check if the company already exists in the database
  // If it exists take over the id and assign it to the job posting
  if (retrievedCompanyId) {
    return retrievedCompanyId;
  } else {
    // If it does not exist:
    return nanoid();
  }
};

export async function mapCategoryToObject(category: jobCategory) {
  category = createCategoryObject(category as unknown as string)!;
}

export async function setLogo(
  result: Job,
  imagePublicId: string | undefined,
  retrievedLogo: string | undefined
) {
  if (imagePublicId || retrievedLogo) {
    result.companyData.logo = imagePublicId || retrievedLogo;
  }
}

export async function filterSdgData(retrievedFormData: Form) {
  const sdgData = retrievedFormData.companyData.sdgs;
  const filteredSdgData: {}[] = [];

  for (const key in sdgData) {
    console.log(`${key}: ${sdgData[key as keyof Boolean]}`);
    if (sdgData[key as keyof Boolean]) {
      let object: any = {};
      object[key] = sdgData[key as keyof Boolean];
      filteredSdgData.push(object);
    }
  }
  console.log('filteredSdgData ' + JSON.stringify(filteredSdgData));

  // let convertedData = [];

  // filteredSdgData.forEach(element => {

  //   });

  return filteredSdgData;
  // filteredSdgData [{"sdg2":true},{"sdg6":true},{"sdg2text":"22"},{"sdg6text":"666"}]
  /* array of 

export interface OrganizationSdg {
  id: string;
  text: string;
}
  */
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
  result: Job,
  salaryValues: {
    minSalary: CurrencyInputOnChangeValues;
    maxSalary: CurrencyInputOnChangeValues;
  }
) {
  if (salaryValues.minSalary) {
    result.salary!.min = salaryValues.minSalary;
  }
  if (salaryValues.maxSalary) {
    result.salary!.max = salaryValues.maxSalary;
  }
}

export async function postJob(retrievedFormData: Job) {
  // Post the job data in the Database
  //todo no console log and nothing is done with data?

  const response = await fetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(retrievedFormData), //todo only save what we need, like postCompany does, convert Form to Job.
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}
