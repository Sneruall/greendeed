import Link from 'next/link';
import React from 'react';
import { Company } from '../../types/types';
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
            , contact us if you would like to update your organization details.
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
