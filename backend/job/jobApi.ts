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
    companyData: {
      name: retrievedFormData.companyData.name,
      description: retrievedFormData.companyData.description,
      logo: retrievedFormData.companyData.logo,
      website: retrievedFormData.companyData.website,
      sdgs: await filterSdgData(retrievedFormData, retrievedCompanyData),
    },
    sdg: ['1'],
  };
  // todo: move these methods up to result object creation, like done for filterSdgData method.
  convertLocationsToArrays(result.locationInfo);
  mapCategoryToObject(result.category);
  setLogo(result, imagePublicId, retrievedCompanyData?.logo);
  setHTMLDescription(result, jobDescriptionHtml, 'job');
  setHTMLDescription(result, companyDescriptionHtml, 'company');
  setSalary(result, salaryValues);
  // filterSdgData(retrievedFormData, result);

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

export async function filterSdgData(
  formData: Form,
  retrievedCompanyData?: Company
) {
  const sdgs = formData.companyData.sdgs;
  let sdgsInfo = formData.companyData.sdgsInfo;

  // If sdg data was retrieved from database for the company, add the data to sdgs
  if (retrievedCompanyData?.sdgs && sdgs) {
    for (let index = 0; index < retrievedCompanyData?.sdgs.length; index++) {
      sdgs[retrievedCompanyData?.sdgs[index].sdg] = true;
    }
  }

  // The final desired array of objects that we return
  const sdgsResult: { sdg: number; text?: string }[] = [];

  // Helper array containing the sdgs that were selected
  const sdgsNumbers: number[] = [];

  // Including the checked sdgs in the sdgsResult array and storing the numbers
  for (const key in sdgs) {
    if (sdgs[key as keyof Boolean]) {
      const object: any = { sdg: key };
      sdgsResult.push(object);
      sdgsNumbers.push(+key);
    }
  }

  // Keep only the data for which the sdg was checked (true value) on submit (and not checked and directly unchecked):
  sdgsInfo = sdgsInfo?.filter((el, i) => {
    return sdgsNumbers.includes(i);
  });

  // Removing the other null values from the array
  const filteredSdgsData = sdgsInfo?.filter((elements) => {
    return elements !== null;
  });

  // Adding the texts to the corresponding objects in the result array
  sdgsResult.forEach((element, i) => {
    element.text = filteredSdgsData![i];
  });

  return sdgsResult;
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
