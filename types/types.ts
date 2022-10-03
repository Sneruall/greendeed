import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';
import { jobCategory } from './jobCategories';

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
    currency: Currency;
    period: SalaryPeriod;
    min: CurrencyInputOnChangeValues;
    max: CurrencyInputOnChangeValues;
    string: string;
  };
  equity?: boolean;
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

export interface Company {
  name: string;
  id: string;
  description?: string;
  website?: string;
  logo?: string;
}

export interface LocationInfo {
  location: Location;
  onSiteLocation?: string[];
  remoteLocation?: RemoteLocation;
  geoRestriction?: string[];
  geoRestrictionOther?: string[];
}

export type Location = 'remote' | 'onSite' | 'onSiteOrRemote';

export type RemoteLocation = 'worldwide' | 'geoRestriction';

export interface LocationObject {
  location: Location;
  remoteLocation: RemoteLocation;
  otherGeoRestriction: boolean;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | '';

export type SalaryPeriod = 'Annual' | 'Monthly' | 'Hourly' | '';
export const SalaryPeriod = ['Annual', 'Monthly', 'Hourly', ''];

export type ApplicationMethod = 'email' | 'website';

export type jobType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Freelance'
  | 'Internship'
  | 'Traineeship'
  | 'Volunteer'
  | 'Other';
export const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
  'Traineeship',
  'Volunteer',
  'Other',
];

export const geoRestrictions = ['Europe', 'US', 'EMEA', 'APAC', 'Other'];

export const currencies = ['$', '€', '£', 'CA$', 'AU$'];

export interface remotiveJob {
  id: string;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  tags: string[];
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  sdg: string[];
  external: boolean;
}

export type remotiveJobSelection = [
  {
    id: string;
    sdg: [];
    timestamp: number;
  }
];

export const sdgList = [
  {
    code: '1',
    name: 'No Poverty',
    title: 'End poverty in all its forms everywhere',
    description:
      'Goal 1 calls for an end to poverty in all its manifestations, including extreme poverty, over the next 15 years. All people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits.',
    uri: '/v1/sdg/Goal/1',
    img: '',
  },
  {
    code: '2',
    name: 'Zero Hunger',
    title:
      'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
    description:
      'Goal 2 seeks to end hunger and all forms of malnutrition and to achieve sustainable food production by 2030. It is premised on the idea that everyone should have access to sufficient nutritious food, which will require widespread promotion of sustainable agriculture, a doubling of agricultural productivity, increased investments and properly functioning food markets.',
    uri: '/v1/sdg/Goal/2',
    img: '',
  },
  {
    code: '3',
    name: 'Good Health and Well-Being',
    title: 'Ensure healthy lives and promote well-being for all at all ages',
    description:
      'Goal 3 aims to ensure health and well-being for all at all ages by improving reproductive, maternal and child health; ending the epidemics of major communicable diseases; reducing non-communicable and environmental diseases; achieving universal health coverage; and ensuring access to safe, affordable and effective medicines and vaccines for all.',
    uri: '/v1/sdg/Goal/3',
    img: '',
  },
  {
    code: '4',
    name: 'Quality Education',
    title:
      'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
    description:
      'Goal 4 focuses on the acquisition of foundational and higher-order skills; greater and more equitable access to technical and vocational education and training and higher education; training throughout life; and the knowledge, skills and values needed to function well and contribute to society.',
    uri: '/v1/sdg/Goal/4',
    img: '',
  },
  {
    code: '5',
    name: 'Gender Equality',
    title: 'Achieve gender equality and empower all women and girls',
    description:
      'Goal 5 aims to empower women and girls to reach their full potential, which requires eliminating all forms of discrimination and violence against them, including harmful practices. It seeks to ensure that they have every opportunity for sexual and reproductive health and reproductive rights; receive due recognition for their unpaid work; have full access to productive resources; and enjoy equal participation with men in political, economic and public life.',
    uri: '/v1/sdg/Goal/5',
    img: '',
  },
  {
    code: '6',
    name: 'Clean Water and Sanitation',
    title:
      'Ensure availability and sustainable management of water and sanitation for all',
    description:
      'Goal 6 goes beyond drinking water, sanitation and hygiene to also address the quality and sustainability of water resources. Achieving this Goal, which is critical to the survival of people and the planet, means expanding international cooperation and garnering the support of local communities in improving water and sanitation management.',
    uri: '/v1/sdg/Goal/6',
    img: '',
  },
  {
    code: '7',
    name: 'Affordable and Clean Energy',
    title:
      'Ensure access to affordable, reliable, sustainable and modern energy for all',
    description:
      'Goal 7 seeks to promote broader energy access and increased use of renewable energy, including through enhanced international cooperation and expanded infrastructure and technology for clean energy.',
    uri: '/v1/sdg/Goal/7',
    img: '',
  },
  {
    code: '8',
    name: 'Decent Work and Economic Growth',
    title:
      'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
    description:
      'Goal 8 aims to provide opportunities for full and productive employment and decent work for all while eradicating forced labour, human trafficking and child labour.',
    uri: '/v1/sdg/Goal/8',
    img: '',
  },
  {
    code: '9',
    name: 'Industry, Innovation and Infrastructure',
    title:
      'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
    description:
      'Goal 9 focuses on the promotion of infrastructure development, industrialization and innovation. This can be accomplished through enhanced international and domestic financial, technological and technical support, research and innovation, and increased access to information and communication technology.',
    uri: '/v1/sdg/Goal/9',
    img: '',
  },
  {
    code: '10',
    name: 'Reduced Income and Improved Living Standards',
    title: 'Reduce inequality within and among countries',
    description:
      'Goal 10 calls for reducing inequalities in income, as well as those based on sex, age, disability, race, class, ethnicity, religion and opportunity—both within and among countries. It also aims to ensure safe, orderly and regular migration and addresses issues related to representation of developing countries in global decision-making and development assistance.',
    uri: '/v1/sdg/Goal/10',
    img: '',
  },
  {
    code: '11',
    name: 'Sustainable Cities and Communities',
    title:
      'Make cities and human settlements inclusive, safe, resilient and sustainable',
    description:
      'Goal 11 aims to renew and plan cities and other human settlements in a way that fosters community cohesion and personal security while stimulating innovation and employment.',
    uri: '/v1/sdg/Goal/11',
    img: '',
  },
  {
    code: '12',
    name: 'Responsible Consumption and Production',
    title: 'Ensure sustainable consumption and production patterns',
    description:
      'Goal 12 aims to promote sustainable consumption and production patterns through measures such as specific policies and international agreements on the management of materials that are toxic to the environment.',
    uri: '/v1/sdg/Goal/12',
    img: '',
  },
  {
    code: '13',
    name: 'Climate Action',
    title: 'Take urgent action to combat climate change and its impacts',
    description:
      'Climate change presents the single biggest threat to development, and its widespread, unprecedented effects disproportionately burden the poorest and the most vulnerable. Urgent action is needed not only to combat climate change and its impacts, but also to build resilience in responding to climate-related hazards and natural disasters.',
    uri: '/v1/sdg/Goal/13',
    img: '',
  },
  {
    code: '14',
    name: 'Life Below Water',
    title:
      'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
    description:
      'Goal 14 seeks to promote the conservation and sustainable use of marine and coastal ecosystems, prevent marine pollution and increase the economic benefits to small island developing States and LDCs from the sustainable use of marine resources.',
    uri: '/v1/sdg/Goal/14',
    img: '',
  },
  {
    code: '15',
    name: 'Life On Land',
    title:
      'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss',
    description:
      'Goal 15 focuses on managing forests sustainably, restoring degraded lands and successfully combating desertification, reducing degraded natural habitats and ending biodiversity loss. All of these efforts in combination will help ensure that livelihoods are preserved for those that depend directly on forests and other ecosystems, that biodiversity will thrive, and that the benefits of these natural resources will be enjoyed for generations to come.',
    uri: '/v1/sdg/Goal/15',
    img: '',
  },
  {
    code: '16',
    name: 'Peace, Justice and Strong Institutions',
    title:
      'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels',
    description:
      'Goal 16 envisages peaceful and inclusive societies based on respect for human rights, the rule of law, good governance at all levels, and transparent, effective and accountable institutions. Many countries still face protracted violence and armed conflict, and far too many people are poorly supported by weak institutions and lack access to justice, information and other fundamental freedoms.',
    uri: '/v1/sdg/Goal/16',
    img: '',
  },
  {
    code: '17',
    name: 'Partnerships for the Goals',
    title:
      'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development',
    description:
      'The 2030 Agenda requires a revitalized and enhanced global partnership that mobilizes all available resources from Governments, civil society, the private sector, the United Nations system and other actors. Increasing support to developing countries, in particular LDCs, landlocked developing countries and small island developing States is fundamental to equitable progress for all.',
    uri: '/v1/sdg/Goal/17',
    img: '',
  },
];
