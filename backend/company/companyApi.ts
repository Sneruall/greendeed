import { Company, Job } from '../../types/types';

let timer: ReturnType<typeof setTimeout>;

export async function postCompany(formData: Job) {
  const companyFormData: Company = {
    name: formData.companyData.name,
    id: formData.companyId,
    description: formData.companyData.description,
    website: formData.companyData.website,
    logo: formData.companyData.logo,
  };
  const companyResponse = await fetch('/api/add-company', {
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
  >
) => {
  setCompanyNameIsLoading(true);
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    findCompany(value, setRetrievedCompanyData);
    setCompanyNameIsLoading(false);
  }, 2000);
};

// Making the call to the DB to check if the company name exists
async function findCompany(
  value: string,
  setRetrievedCompanyData: React.Dispatch<
    React.SetStateAction<Company | undefined>
  >
) {
  if (value.length < 2 || !value) {
    setRetrievedCompanyData({
      name: 'x',
      id: '',
      description: '',
      website: '',
      logo: '',
    });
    return;
  }
  const res = await fetch(`/api/find-company/${value}`);
  const data = await res.json();
  setRetrievedCompanyData({
    name: await data.name,
    id: await data.id,
    description: await data.description,
    website: await data.website,
    logo: await data.logo,
  });
}
