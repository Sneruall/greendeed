import { Company, Job } from '../../types/types';

export async function postCompany(formData: Job) {
  const companyFormData: Company = {
    name: formData.companyName,
    id: formData.companyId,
    description: formData.companyDescription,
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
