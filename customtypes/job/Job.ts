import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';
import { jobCategory } from '../jobCategories';
import {
  ApplicationMethod,
  Currency,
  jobType,
  LocationInfo,
  SalaryPeriod,
} from '../types';

export interface Job {
  companyId: string;
  companyData: {
    name: string;
    description?: string;
    website?: string;
    logo?: string;
  };
  jobTitle: string;
  category: jobCategory;
  sdg: string[];
  tags?: string[];
  jobDescription: string;
  jobType: jobType;
  salary?: {
    currency?: Currency;
    period?: SalaryPeriod;
    min?: CurrencyInputOnChangeValues;
    max?: CurrencyInputOnChangeValues;
    string?: string;
  };
  locationInfo: LocationInfo;
  email: string;
  timestamp: number;
  id: string;
  price: number;
  paid: boolean;
  hidden: boolean;
  listed: boolean;
  closed: boolean;
  applicationMethod: ApplicationMethod;
  apply: string;
  external: boolean;
}
