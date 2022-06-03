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
    currency: Currency;
    min: number;
    max?: number;
  };
  location: Location;
  onSiteLocation?: string[];
  remoteLocation?: RemoteLocation;
  geoRestriction?: string[];
  geoRestrictionOther?: string[];
  link: string;
  email: string;
  timestamp: number;
  id: string;
  price: number;
  paid: boolean;
  hidden: boolean;
  listed: boolean;
};

// todo: add fields (websiteurl, employees...)
export type Company = {
  name: string;
  id: string;
  description: string;
};

export type Location = 'remote' | 'onSite' | 'onSiteOrRemote';
export type RemoteLocation = 'worldwide' | 'geoRestriction';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
