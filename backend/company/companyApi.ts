import { Company, Form, Job } from '../../types/types';

let timer: ReturnType<typeof setTimeout>;

// Todo: convert Formdata into Company type.
export async function postCompany(
  transformedFormData: Job,
  retrievedCompanyData: Company | undefined
) {
  const companyFormData: Company = {
    // take over the fields we want to store in company database (note also must be included in /api/update-company)
    name: transformedFormData.companyData.name,
    id: transformedFormData.companyId,
    description:
      transformedFormData.companyData.description ||
      retrievedCompanyData?.description,
    website:
      transformedFormData.companyData.website || retrievedCompanyData?.website,
    logo: transformedFormData.companyData.logo || retrievedCompanyData?.logo,
    sdgs: transformedFormData.companyData.sdgs,
  };
  const companyResponse = await fetch('/api/update-company', {
    method: 'POST',
    body: JSON.stringify(companyFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const companyData = await companyResponse.json();
  console.log(companyData);
}

// Function that is called onChange of company name field for checking the value in DB with timeout.
export const checkCompany = (
  value: string,
  setCompanyNameIsLoading: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >,
  setRetrievedCompanyData: React.Dispatch<
    React.SetStateAction<Company | undefined>
  >,
  setWebsite: React.Dispatch<React.SetStateAction<string>>
) => {
  // todo if value is 2 or more...
  if (value.length > 1) {
    setCompanyNameIsLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      findCompany(value, setRetrievedCompanyData, setWebsite);
      setCompanyNameIsLoading(false);
    }, 2000);
  }
};

// Making the call to the DB to check if the company name exists
async function findCompany(
  value: string,
  setRetrievedCompanyData: React.Dispatch<
    React.SetStateAction<Company | undefined>
  >,
  setWebsite: React.Dispatch<React.SetStateAction<string>>
) {
  if (value.length < 2 || !value) {
    setRetrievedCompanyData({
      name: '',
      id: '',
      description: '',
      website: '',
      logo: '',
      sdgs: [],
    });
    return;
  }
  const res = await fetch(`/api/find-company/${value}`);
  const data = await res.json();
  console.log(data);
  setRetrievedCompanyData({
    name: data.name,
    id: data.id,
    description: data.description,
    website: data.website,
    logo: data.logo,
    sdgs: data.sdgs,
  });
  setWebsite(data.website);
}
