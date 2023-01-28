import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';
import { jobCategory } from './jobCategories';

// Todo:
// - consider converting into separate smaller type files (per type) like fr does
// -  make more use of object types (with id, value and title), like Location const
// - make use of absolute imports: https://blog.logrocket.com/understanding-relative-absolute-imports-next-js/

export interface Form {
  companyId: string;
  companyData: {
    name: string;
    description?: string;
    website?: string;
    logo?: string;
    sdgs?: boolean[];
    sdgsInfo?: string[];
  };
  jobTitle: string;
  category: keyof jobCategory;
  sdg: string[];
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
  acceptedPaymentTerms: boolean;
  applicationMethod: ApplicationMethod;
  apply: string;
  external: boolean;
  coupon: string;
}

export interface Job {
  companyId: string; // Todo: This causes a mismatch when using update-jobs api, causing it to always update it right away after creation, which an be prevented: remove it and add 'id' to companyData (and ensure that everything keeps working)
  companyData: {
    name: string;
    description?: string;
    website?: string;
    logo?: string;
    sdgs: sdgs;
  };
  jobTitle: string;
  category: jobCategory;
  sdg: string[];
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
  paid: boolean; // Paid for job placement or not
  published: boolean; // published on the platform or not
  listed: boolean; // listed in the jobLists or not
  closed: boolean; // Position already fulfilled or not
  applicationMethod: ApplicationMethod;
  apply: string;
  external: boolean;
}

export interface Company {
  name: string;
  id: string;
  description?: string;
  website?: string;
  sdgs: sdgs;
  logo?: string;
}

export type sdgs = {
  sdg: string;
  text?: string | undefined;
}[];

// todo, check not being used atm
export interface OrganizationSdg {
  id: string;
  text: string;
}

export interface LocationInfo {
  location: Location;
  onSiteLocation?: string[];
  geoRestriction?: string[];
}

export type Location = 'remote' | 'onSite' | 'onSiteOrRemote';
export const Location = [
  {
    id: 1,
    value: 'remote',
    title: 'Remote',
  },
  {
    id: 2,
    value: 'onSite',
    title: 'On Site',
  },
  { id: 3, value: 'onSiteOrRemote', title: 'Hybrid (On Site or Remote)' },
];

export interface LocationObject {
  location: Location;
  otherGeoRestriction: boolean;
}

export const ApplicationMethods = [
  {
    id: 1,
    value: 'email',
    title: 'Sending us an E-mail',
  },
  {
    id: 2,
    value: 'website',
    title: 'Via a link on our website',
  },
];

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | '';

export type SalaryPeriod = 'Annual' | 'Monthly' | 'Hourly';
export const SalaryPeriod = ['Annual', 'Monthly', 'Hourly'];

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

// todo: ook worldwide toevoegen (en die speciaal maken, kan alleen enkel worden ingevuld)
export const geoRestrictions = [
  {
    id: 0,
    value: 'worldwide',
    title: '🗺️ Worldwide',
  },
  {
    id: 1,
    value: 'africa',
    title: '🌍 Africa',
  },
  {
    id: 2,
    value: 'asia',
    title: '🌏 Asia',
  },
  {
    id: 3,
    value: 'europe',
    title: '🌍 Europe',
  },
  {
    id: 4,
    value: 'latin-america',
    title: 'Latin America',
  },
  {
    id: 5,
    value: 'middle-east',
    title: 'Middle East',
  },
  {
    id: 6,
    value: 'north-america',
    title: 'North America',
  },
  {
    id: 7,
    value: 'oceania',
    title: 'Oceania',
  },
];

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

export type emailData = {
  jobTitle: string;
  email: string;
  companyName: string;
  jobType: jobType;
};

export const sdgList = [
  {
    code: '1',
    name: 'No Poverty',
    title: 'End poverty in all its forms everywhere',
    description:
      'Goal 1 calls for an end to poverty in all its manifestations, including extreme poverty, over the next 15 years. All people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits.',
    uri: '/v1/sdg/Goal/1',
    img: '',
    greendeedDescription:
      'The first sustainable development goal, to end poverty in all its forms, is an ambitious and noble goal that can change lives for the better. As stated by the United Nations, this goal calls for an end to poverty, including extreme poverty, over the next 15 years. It emphasizes on ensuring that all people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits. This can be achieved through sustainable jobs, such as those in renewable energy and sustainable agriculture, which not only provide economic opportunities, but also help to lift individuals and communities out of poverty, giving them hope and a brighter future. Together, we can create a world where no one is left behind and everyone has access to basic standard of living and social protection.',
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
    greendeedDescription:
      'The second sustainable development goal is to end hunger, achieve food security and improved nutrition and promote sustainable agriculture. Sustainable jobs, such as those in organic farming, agroforestry, permaculture, and regenerative agriculture, can contribute to achieving this goal by providing healthy and nutritious food, reducing environmental impact of agriculture and increasing rural livelihoods. These jobs can also promote food security, by providing access to healthy food for communities and reducing the vulnerability of farming systems to climate change and environmental degradation. Together, we can create a world where everyone has access to nutritious and healthy food, and sustainable jobs are a key driver for achieving this goal.',
  },
  {
    code: '3',
    name: 'Good Health and Well-Being',
    title: 'Ensure healthy lives and promote well-being for all at all ages',
    description:
      'Goal 3 aims to ensure health and well-being for all at all ages by improving reproductive, maternal and child health; ending the epidemics of major communicable diseases; reducing non-communicable and environmental diseases; achieving universal health coverage; and ensuring access to safe, affordable and effective medicines and vaccines for all.',
    uri: '/v1/sdg/Goal/3',
    img: '',
    greendeedDescription:
      'The third sustainable development goal is to ensure good health and well-being for all at all ages. This goal aims to improve reproductive, maternal and child health, end epidemics of major communicable diseases, reduce non-communicable and environmental diseases, achieve universal health coverage, and ensure access to safe, affordable, and effective medicines and vaccines for all. Sustainable jobs in various industries such as healthcare, environmental protection, sustainable agriculture, renewable energy, and sustainable transportation all contribute to achieving this goal. These jobs provide access to quality health care services, reduce environmental health hazards, provide access to healthy and nutritious food, reduce environmental impact, increase rural livelihoods, provide clean energy and promote active and healthy lifestyles. Together we can create a world where good health and well-being is accessible to all, with sustainable jobs playing a key role.',
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
    greendeedDescription:
      'The fourth sustainable development goal is to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. This goal aims to ensure that all individuals, regardless of their background, have access to education and opportunities for skill development. Sustainable jobs in various industries such as education, technology, and sustainable development play a critical role in achieving this goal. In education, jobs such as teachers, curriculum developers, and education administrators provide access to quality education. In technology, jobs such as software developers, data analysts, and digital literacy trainers help to bridge the digital divide and provide access to digital skills. In sustainable development, jobs such as sustainable design engineers, and environmental educators promote sustainable practices and raise awareness about environmental issues. Together, we can create a world where inclusive and equitable education and lifelong learning opportunities are accessible to all, with sustainable jobs playing a key role in achieving this goal.',
  },
  {
    code: '5',
    name: 'Gender Equality',
    title: 'Achieve gender equality and empower all women and girls',
    description:
      'Goal 5 aims to empower women and girls to reach their full potential, which requires eliminating all forms of discrimination and violence against them, including harmful practices. It seeks to ensure that they have every opportunity for sexual and reproductive health and reproductive rights; receive due recognition for their unpaid work; have full access to productive resources; and enjoy equal participation with men in political, economic and public life.',
    uri: '/v1/sdg/Goal/5',
    img: '',
    greendeedDescription:
      'The fifth sustainable development goal is to achieve gender equality and empower all women and girls. This goal aims to eliminate all forms of discrimination and violence against women and girls, and to ensure their full participation and leadership in all spheres of life. Sustainable jobs in various industries such as healthcare, social services, education, and technology all contribute to achieving this goal. Jobs such as health workers, social workers, and counselors provide support for women and girls who have experienced violence, and create a safe environment for them. Jobs in education and technology, such as teachers, trainers, and digital literacy facilitators, provide access to education and digital skills for women and girls, thereby increasing their economic and social opportunities. Jobs in leadership, such as policymakers, managers, and business leaders, provide opportunities for women to take on leadership roles and make decisions that affect their lives and communities. Together we can create a world where gender equality is a reality, with sustainable jobs playing a key role in achieving this goal.',
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
    greendeedDescription:
      'The sixth sustainable development goal is to ensure availability and sustainable management of water and sanitation for all. This goal aims to ensure the availability of safe and affordable water for all, and to improve the management of water resources by implementing sustainable practices. Sustainable jobs in various industries such as water management, engineering, and environmental protection all contribute to achieving this goal. Jobs such as water treatment plant operators, water resource managers, and hydrologists ensure the availability of safe and clean water. Jobs in engineering, such as water infrastructure engineers, help to design and maintain sustainable water systems. Jobs in environmental protection, such as conservation biologists, and ecologists, help to protect and restore ecosystems and natural resources that support water availability. Together, we can create a world where everyone has access to safe and sustainable water, with jobs in these fields playing a key role in achieving this goal.',
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
    greendeedDescription:
      'The seventh sustainable development goal is to ensure access to affordable, reliable, sustainable and modern energy for all. This goal aims to increase the use of renewable energy sources, improve energy efficiency, and increase access to energy in developing countries. Sustainable jobs in various industries such as renewable energy, energy efficiency, and energy management all contribute to achieving this goal. Jobs such as solar panel installers, wind turbine technicians, and energy efficiency consultants help to increase the use of renewable energy and improve energy efficiency. Jobs in energy management, such as energy analysts and energy traders, help to ensure the reliable and sustainable supply of energy.',
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
    greendeedDescription:
      'The eighth sustainable development goal is to promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all, while eradicating forced labour, human trafficking, and child labour. This goal aims to create jobs, reduce poverty and inequality, and promote economic growth in a sustainable way, while protecting the rights of workers and eliminating practices that exploit them. Sustainable jobs in various industries such as sustainable finance, sustainable agriculture, and sustainable tourism all contribute to achieving this goal. Jobs such as sustainable investment analysts, organic farmers, and ecotourism guides help to promote sustainable economic growth, create jobs and protect the environment. Jobs such as labor rights advocates, fair trade coordinators, and social entrepreneurs promote fair trade and decent work for all, while working to eliminate forced labour, human trafficking, and child labour. Together, we can create a world where sustained, inclusive, and sustainable economic growth is possible for all, with sustainable jobs playing a key role in achieving this goal.',
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
    greendeedDescription:
      'The ninth sustainable development goal focuses on building resilient infrastructure, promoting inclusive and sustainable industrialization and fostering innovation. This goal aims to improve access to infrastructure and technology, spur economic growth and create jobs in a sustainable way. Sustainable jobs in industries such as renewable energy, green infrastructure, and sustainable manufacturing all contribute to achieving this goal. Jobs such as solar panel installers, green architects, and sustainable product designers all play a role in building resilient infrastructure and promoting sustainable industrialization. Jobs such as renewable energy engineers, sustainable transportation planners, and green building consultants help to increase access to clean energy, sustainable transportation and sustainable buildings. Additionally, jobs such as sustainable innovation consultants and sustainable technology researchers help to foster sustainable innovation and research. Together, we can create a world where sustainable infrastructure, industrialization and innovation are possible for all, with sustainable jobs playing a key role in achieving this goal.',
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

export interface blog {
  _id: number;
  title: string;
  excerpt: string;
  slug: any;
  publishedAt: string;
  mainImage: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}
