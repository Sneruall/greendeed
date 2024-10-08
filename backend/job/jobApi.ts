import { customAlphabet } from 'nanoid';
import { jobCategoriesList, jobCategory } from '../../types/jobCategories';
import {
  Company,
  emailData,
  Form,
  Job,
  LocationInfo,
  sdgList,
} from '../../types/types';
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
  imagePublicId?: string,
  geoRestrictionValues?: string[] | undefined
) {
  let result: Job = {
    category: await mapCategoryToObject(retrievedFormData.category),
    email: retrievedFormData.email,
    fullName: retrievedFormData.fullName,
    apply: retrievedFormData.apply,
    applicationMethod: retrievedFormData.applicationMethod,
    companyId: setCompanyId(retrievedCompanyData?.id),
    jobTitle: retrievedFormData.jobTitle,
    jobDescription: retrievedFormData.jobDescription,
    jobType: retrievedFormData.jobType,
    id: setJobId(),
    paid: true,
    closed: false,
    external: false,
    listed: true,
    published: retrievedCompanyData?.id ? true : false,
    locationInfo: await setLocationInfo(
      retrievedFormData.locationInfo,
      geoRestrictionValues
    ),
    timestamp: registerJobTimestamp(),
    salary: retrievedFormData.salary,
    companyData: {
      name: retrievedFormData.companyData.name,
      description: retrievedFormData.companyData.description,
      logo: retrievedFormData.companyData.logo,
      website: retrievedFormData.companyData.website,
      sdgs: await filterSdgData(retrievedFormData, retrievedCompanyData),
    },
    coupon: retrievedFormData.coupon,
    invoiceInfo: retrievedFormData.invoiceInfo,
  };
  convertLocationsToArrays(result.locationInfo);
  setLogo(result, imagePublicId, retrievedCompanyData?.logo);
  setHTMLDescription(result, jobDescriptionHtml, 'job');
  setHTMLDescription(result, companyDescriptionHtml, 'company');
  setSalary(result, salaryValues);

  return result;
}

export const convertLocationsToArrays = (locationInfo: LocationInfo) => {
  if (locationInfo.onSiteLocation) {
    locationInfo.onSiteLocation = convertCommaSeparatedStringToArray(
      locationInfo.onSiteLocation
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

export async function mapCategoryToObject(category: jobCategory['name']) {
  console.log('mapCategoryToObject function runs');
  return createCategoryObject(category)!;
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
      sdgs[+retrievedCompanyData?.sdgs[index].sdg] = true;
    }
  }

  // The final desired array of objects that we return
  const sdgsResult: { sdg: string; text?: string }[] = [];

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

export async function postJob(transformedFormData: Job) {
  // Post the job data in the Database
  const response = await fetch('/api/job', {
    method: 'POST',
    body: JSON.stringify(transformedFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}

export async function postTweet(job: Job) {
  // Post the job data to the Twitter endpoint
  const response = await fetch('/api/jobs/tweetJob', {
    method: 'POST',
    body: JSON.stringify(job),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}

export async function updateJobs(updatedCompanyData: Company) {
  const companyResponse = await fetch('/api/job', {
    method: 'PUT',
    body: JSON.stringify(updatedCompanyData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const updatedJobs = await companyResponse.json();
  console.log(updatedJobs);
}

export async function sendConfirmationEmail(emailData: emailData) {
  const emailResponse = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/order-confirmation-email`,
    {
      method: 'POST',
      body: JSON.stringify(emailData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const email = await emailResponse.json();
  console.log(email);
}

async function setLocationInfo(
  locationInfo: LocationInfo,
  geoRestrictionValues: string[] | undefined
) {
  if (locationInfo.location === 'onSite') {
    return locationInfo;
  } else {
    const result = locationInfo;
    result.geoRestriction = geoRestrictionValues;
    return result;
  }
}
