export type Job = {
  companyName: string;
  companyId: string;
  companyDescription: string;
  jobTitle: string;
  category: string;
  tags?: string[];
  jobDescription: string;
  jobType: string;
  salary?: {
    currency?: Currency;
    min?: number;
    max?: number;
  };
  equity?: {
    min?: number;
    max?: number;
  };
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
  applyEmail: string;
  applyWebsite: string;
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

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';

export type ApplicationMethod = 'email' | 'website';
