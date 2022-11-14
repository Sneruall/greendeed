import Link from 'next/link';
import React from 'react';
import { Company } from '../../customtypes/types';
import { generateCompanyUrl } from '../../helpers/urlGeneration';

const CompanyChecker: React.FC<{
  companyNameIsLoading: boolean | undefined;
  retrievedCompanyData: Company | undefined;
  errorsCompanyName: any;
}> = ({ companyNameIsLoading, retrievedCompanyData, errorsCompanyName }) => {
  return (
    <div>
      {!companyNameIsLoading &&
        retrievedCompanyData?.name &&
        retrievedCompanyData.id && (
          <p className="text-blue-800">
            Welcome back{' '}
            <Link
              href={generateCompanyUrl(
                retrievedCompanyData.name.toLowerCase(),
                retrievedCompanyData.id
              )}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {retrievedCompanyData.name}
              </a>
            </Link>
            , we retrieved the below information from previous job posts made by
            you, feel free to update it.
          </p>
        )}
      {companyNameIsLoading != undefined &&
        !companyNameIsLoading &&
        !retrievedCompanyData?.name &&
        'Welcome to Greendeed!'}
      {companyNameIsLoading &&
        'Checking for existing organizations at Greendeed...'}
    </div>
  );
};

export default CompanyChecker;
