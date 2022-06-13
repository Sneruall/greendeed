import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';

export type Job = {
  companyName: string;
  companyId: string;
  companyDescription: string;
  jobTitle: string;
  category: jobCategory;
  tags?: string[];
  jobDescription: string;
  jobType: jobType;
  salary: {
    currency: Currency;
    period: SalaryPeriod;
    min: CurrencyInputOnChangeValues;
    max: CurrencyInputOnChangeValues;
  };
  equity: boolean;
  digitalCurrency: boolean;
  locationInfo: LocationInfo;
  email: string;
  timestamp: number;
  id: string;
  price: number;
  paid: boolean;
  hidden: boolean;
  listed: boolean;
  applicationMethod: ApplicationMethod;
  apply: string;
  companyWebsite: string;
};

// todo: add fields (websiteurl, employees...)
export type Company = {
  name: string;
  id: string;
  description: string;
};

export type LocationInfo = {
  location: Location;
  onSiteLocation?: string[];
  remoteLocation?: RemoteLocation;
  geoRestriction?: string[];
  geoRestrictionOther?: string[];
};

// Todo: Maybe find how to not hardcode this but use global constants or something?
export type Location = 'remote' | 'onSite' | 'onSiteOrRemote';

export type RemoteLocation = 'worldwide' | 'geoRestriction';

export type LocationObject = {
  location: Location;
  remoteLocation: RemoteLocation;
  otherGeoRestriction: boolean;
};

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export type SalaryPeriod = 'Annual' | 'Monthly' | 'Hourly';
export const SalaryPeriod = ['Annual', 'Monthly', 'Hourly'];

export type ApplicationMethod = 'email' | 'website';

export type jobCategory = 'IT' | 'Operations' | 'Manufacturing' | 'Consultancy';
export const jobCategories = [
  'IT',
  'Operations',
  'Manufacturing',
  'Consultancy',
];
{
  /* Todo: make the categories complete: https://tallo.com/blog/types-of-careers/ https://www.recruiter.com/careers/ */
}
{
  /* <option>Software Development</option>
        <option>Customer Support</option>
        <option>Design</option>
        <option>DevOps and Sysadmin</option>
        <option>Sales and Marketing</option>
        <option>Legal and Finance</option>
        <option>Operations</option>
        <option>Management</option>
        <option>Non-tech</option>
        <option>Product</option>
        <option>Business</option>
        <option>Data</option>
        <option>Human Resources</option>
        <option>Writing</option>
        <option>Other</option> */
}

export type jobType =
  | 'Full-time'
  | 'Part-time'
  | 'Freelance'
  | 'Internship'
  | 'Traineeship'
  | 'Volunteer'
  | 'Other';
export const jobTypes = [
  'Full-time',
  'Part-time',
  'Freelance',
  'Internship',
  'Traineeship',
  'Volunteer',
  'Other',
];

export const geoRestrictions = ['Europe', 'US', 'EMEA', 'APAC', 'Other'];

export const currencies = ['$', '€', '£', 'CA$', 'AU$'];
