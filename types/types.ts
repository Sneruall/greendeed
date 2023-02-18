import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';
import { jobCategory } from './jobCategories';

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
  fullName: string;
  timestamp: number;
  id: string;
  price: number;
  acceptedPaymentTerms: boolean;
  applicationMethod: ApplicationMethod;
  apply: string;
  external: boolean;
  coupon: string;
  invoiceInfo: InvoiceInfo;
}

export interface InvoiceInfo {
  name: string;
  companyName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Job {
  companyId: string;
  companyData: {
    name: string;
    description?: string;
    website?: string;
    logo?: string;
    sdgs: sdgs;
  };
  jobTitle: string;
  category: jobCategory;
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
  fullName: string;
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
  coupon?: string;
  invoiceInfo?: InvoiceInfo;
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
  { id: 3, value: 'onSiteOrRemote', title: 'Hybrid (Remote & On Site)' },
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

export const currencies = ['€', '$', '£', 'CA$', 'AU$'];

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
  sdgs: sdgs;
  external: boolean;
}

export type remotiveJobSelection = [
  {
    id: string;
    sdgs: sdgs;
    timestamp: number;
  }
];

export type emailData = {
  jobTitle: string;
  email: string;
  fullName: string;
  jobType: jobType;
  id: string;
  price: number;
  companyData: Company;
  invoiceInfo?: InvoiceInfo;
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
      'Goal 1 emphasizes on ensuring that all people everywhere, including the poorest and most vulnerable, should enjoy a basic standard of living and social protection benefits. Achieving this goal requires collaboration and coordination from various sectors, including non-governmental organizations (NGOs), microfinance institutions, international development agencies, social businesses, impact investing firms, and government organizations. NGOs, such as Oxfam, UNICEF, and World Vision, provide direct aid and support to communities in need. Microfinance institutions, such as Grameen Bank, Kiva, and Accion, offer financial services to those who are underserved by traditional banking systems. International development agencies, such as the World Bank and the International Monetary Fund, provide funding and support to governments and organizations working to reduce poverty. Social businesses and impact investing firms use business strategies to tackle poverty by creating jobs and providing access to essential goods and services in poor communities. Government organizations, such as the Department for International Development (DFID) and USAID, design and implement poverty reduction strategies at a national level. Through their efforts, these organizations work towards creating a world where all people have access to a basic standard of living and social protection benefits, thereby helping to achieve the goal of ending poverty in all its forms.',
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
      "Goal 2 aims to end hunger, achieve food security and improved nutrition, and promote sustainable agriculture. Organizations that support this goal come from various sectors including agriculture, food security, and nutrition. These organizations work to increase food production, improve access to food, and address the root causes of hunger. These organizations include non-government organizations (NGOs) such as World Food Programme (WFP) and Action Against Hunger, international development agencies such as the Food and Agriculture Organization (FAO) and the World Bank, and government organizations such as the United States Department of Agriculture (USDA) and the United Kingdom's Department for International Development (DFID). Through their efforts to improve food systems, increase food production and access, and address the root causes of hunger, these organizations work towards a world where everyone has access to enough nutritious food to lead a healthy life, thereby achieving the goal of Zero Hunger.",
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
      'Goal 3 aims to ensure healthy lives and promote well-being for all at all ages. To achieve this goal, various organizations from different sectors work together, including governments, international organizations, NGOs, and private businesses. Government agencies are responsible for developing policies and programs that promote healthy living, and providing access to quality healthcare services, nutrition, and safe water and sanitation. International organizations such as the World Health Organization (WHO) and the United Nations Development Programme (UNDP) provide technical support and expertise to governments, and help to coordinate global efforts to improve health outcomes. NGOs such as Doctors Without Borders and the Red Cross provide direct medical services to people in need, and work to improve health infrastructure in underserved communities. Private businesses also play a critical role in promoting healthy living, by developing and producing healthy food and beverage options, creating workplace wellness programs, and investing in research and development of new medical technologies. By working together and pooling resources, these organizations aim to ensure that people everywhere can lead healthy lives and have access to the resources they need to thrive.',
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
      "Goal 4 focuses on ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all. Achieving this goal requires the efforts of various sectors, including governments, educational institutions, non-governmental organizations (NGOs), private sector companies, and international organizations. Governments are responsible for implementing policies and programs that ensure access to quality education for all, regardless of gender, income, or location. Educational institutions, such as primary schools, secondary schools, and universities, provide the actual learning experiences and opportunities. NGOs, such as Save the Children and Education Cannot Wait, support education initiatives in communities where access to quality education is limited. Private sector companies, such as Microsoft and Google, invest in technology and innovation to enhance learning opportunities and outcomes. International organizations, such as the United Nations Children's Fund (UNICEF) and the Global Partnership for Education, provide funding and support to ensure that education is accessible to all, regardless of their circumstances. Through their efforts, these sectors work towards creating a world where all people have access to inclusive and equitable quality education and lifelong learning opportunities, thereby helping to achieve the goal of inclusive and quality education for all.",
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
      "Goal 5 focuses on achieving gender equality and empowering all women and girls. Achieving this goal requires efforts from a range of sectors, including civil society organizations, government institutions, and the private sector. Civil society organizations, such as the United Nations Women and the International Women's Health Coalition, work towards advancing women's rights and promoting gender equality through advocacy and programming. Government institutions, such as the Ministry of Women's Affairs and the National Commission on the Status of Women, have a key role in implementing policies and programs that address gender inequalities and promote women's empowerment. The private sector also has a significant role to play in advancing gender equality by creating a diverse and inclusive workplace, promoting gender-responsive procurement, and supporting women-owned businesses. Through their efforts, these organizations are working towards a world where every woman and girl has equal rights and opportunities, and can realize their full potential.",
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
      'Goal 6 aims to ensure availability and sustainable management of water and sanitation for all. Reaching this goal requires cooperation and collaboration from various sectors, including government organizations, international development agencies, non-profit organizations, private companies, and local communities. Government organizations, such as the United Nations Water and the World Health Organization, play a critical role in setting policies and implementing programs to improve water and sanitation access. International development agencies, such as the World Bank, provide funding and technical assistance to support water and sanitation projects. Non-profit organizations, such as Water.org and Sanitation and Water for All, work directly with communities to improve access to clean water and proper sanitation facilities. Private companies, such as water utilities and technology providers, develop and implement innovative solutions to address water and sanitation challenges. Through these collective efforts, all stakeholders are working towards a future where everyone has access to safe and sustainable water and sanitation services.',
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
      'Goal 7 aims to ensure access to reliable, sustainable, and modern energy for all. To achieve this goal, various organizations and sectors must work together. This includes government organizations, energy companies, and research institutions. Government organizations, such as the International Energy Agency (IEA), are responsible for creating energy policies that promote access to clean energy. Energy companies, such as renewable energy providers and energy efficiency firms, work to produce and distribute affordable and clean energy. Research institutions, such as the National Renewable Energy Laboratory (NREL) and the International Renewable Energy Agency (IRENA), focus on developing new technologies and improving existing ones to increase access to clean energy. These organizations work together to promote energy solutions that are sustainable, reliable, and accessible to all, thereby helping to achieve the goal of affordable and clean energy for all.',
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
      "Goal 8 aims to promote opportunities for full and productive employment and decent work for all, while eradicating forced labor, human trafficking, and child labor. To achieve this, various sectors, including labor organizations, trade unions, employers' associations, and governments, must work together. Labor organizations, such as the International Labor Organization (ILO), advocate for workers' rights and decent working conditions. Trade unions, such as the AFL-CIO, represent workers and negotiate with employers on their behalf. Employers' associations, such as the National Association of Manufacturers, represent businesses and promote policies that support economic growth and job creation. Governments play a crucial role in implementing labor laws and regulations that protect workers' rights and ensure safe and healthy working conditions. Through their efforts, these organizations can create a world where all workers have access to decent and dignified work, free from exploitation and discrimination.",
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
      'Goal 9 focuses on building resilient infrastructure, promoting inclusive and sustainable industrialization, and fostering innovation. Organizations from various sectors, such as the private sector, government agencies, and academic institutions, play a crucial role in achieving this goal. The private sector can invest in and implement innovative technologies and sustainable business practices, while government agencies can provide support and create policies that promote sustainable industrialization. Academic institutions can contribute by conducting research and providing training and education in relevant fields. Through these efforts, organizations can work towards building a more resilient and sustainable future, promoting economic growth and creating new job opportunities, especially in developing countries.',
  },
  {
    code: '10',
    name: 'Reduced Inequalities',
    title: 'Reduce inequality within and among countries',
    description:
      'Goal 10 calls for reducing inequalities in income, as well as those based on sex, age, disability, race, class, ethnicity, religion and opportunity—both within and among countries. It also aims to ensure safe, orderly and regular migration and addresses issues related to representation of developing countries in global decision-making and development assistance.',
    uri: '/v1/sdg/Goal/10',
    img: '',
    greendeedDescription:
      'Goal 10 is to reduce inequalities and requires collaboration and coordination from various sectors, including government organizations, non-government organizations (NGOs), international development agencies, and the private sector. Government organizations, such as the United Nations Development Programme (UNDP), design and implement policies to address inequality, promote inclusive growth, and empower marginalized communities. NGOs, such as Oxfam and Amnesty International, work to raise awareness and advocate for policies to address inequalities. International development agencies, such as the World Bank, provide funding and support to governments and organizations working to reduce inequalities. The private sector has a role to play in reducing inequalities by promoting fair labor practices, supporting sustainable development, and investing in marginalized communities. Through their efforts, these organizations work towards creating a more equal world where everyone has the opportunity to succeed, regardless of their background.',
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
    greendeedDescription:
      'Goal 11 focuses on making cities and human settlements inclusive, safe, resilient, and sustainable. To achieve this, efforts are needed from various sectors, including local and national governments, international organizations, non-profit organizations, and the private sector. Local and national governments play a crucial role in urban planning and development, while international organizations such as the United Nations Human Settlements Programme (UN-Habitat) provide technical assistance and support to governments in these efforts. Non-profit organizations, such as Habitat for Humanity, work towards creating affordable housing and promoting safe and inclusive communities. The private sector, through investment in sustainable and resilient infrastructure, can also play a key role in realizing this goal. Through these collective efforts, the aim is to create cities and human settlements that are inclusive, safe, resilient, and sustainable for all.',
  },
  {
    code: '12',
    name: 'Responsible Consumption and Production',
    title: 'Ensure sustainable consumption and production patterns',
    description:
      'Goal 12 aims to promote sustainable consumption and production patterns through measures such as specific policies and international agreements on the management of materials that are toxic to the environment.',
    uri: '/v1/sdg/Goal/12',
    img: '',
    greendeedDescription:
      'Goal 12 aims to ensure sustainable consumption and production patterns. To achieve this goal, various sectors, including businesses, governments, and international organizations, must take action. Businesses can take a lead in promoting sustainable production methods, reducing waste, and improving resource efficiency. Governments can implement policies that encourage sustainable consumption and production, such as product labeling and eco-taxation. International organizations can support the implementation of sustainable consumption and production by providing technical assistance and funding to governments and businesses. Through their efforts, these sectors can help shift society towards more sustainable consumption and production patterns, promoting economic growth while minimizing environmental impact and preserving natural resources for future generations.',
  },
  {
    code: '13',
    name: 'Climate Action',
    title: 'Take urgent action to combat climate change and its impacts',
    description:
      'Climate change presents the single biggest threat to development, and its widespread, unprecedented effects disproportionately burden the poorest and the most vulnerable. Urgent action is needed not only to combat climate change and its impacts, but also to build resilience in responding to climate-related hazards and natural disasters.',
    uri: '/v1/sdg/Goal/13',
    img: '',
    greendeedDescription:
      'Goal 13 aims to take urgent action to combat climate change and its impacts. To achieve this goal, various sectors must work together, including governments, businesses, civil society organizations, and individuals. Governments play a crucial role in establishing policies and regulations to reduce greenhouse gas emissions and mitigate the impacts of climate change. Businesses can contribute by implementing sustainable practices, investing in renewable energy, and improving energy efficiency. Civil society organizations can raise awareness and advocate for action on climate change. Individuals can make changes in their daily lives to reduce their carbon footprint, such as using public transportation, reducing energy usage, and reducing waste. Through their collective efforts, these sectors can help to mitigate the impacts of climate change and achieve a more sustainable future.',
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
    greendeedDescription:
      'Goal 14 focuses on conserving and sustainably using the oceans, seas, and marine resources for sustainable development. Governments, businesses, civil society organizations, and individuals all have a role to play in achieving this goal. Governments can implement policies and regulations to protect marine ecosystems and prevent overfishing. Businesses can adopt sustainable fishing practices and reduce their impact on the ocean. Civil society organizations can raise awareness about the importance of ocean conservation and advocate for action. Individuals can make changes in their daily lives to reduce their impact on the ocean, such as reducing single-use plastics and choosing sustainable seafood. Through their collective efforts, these sectors can help to conserve and sustainably use the ocean for future generations.',
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
    greendeedDescription:
      'Goal 15 focuses on protecting, restoring, and promoting the sustainable use of terrestrial ecosystems, forests, mountains, and deserts, as well as ensuring the conservation of biodiversity. Organizations play a crucial role in achieving this goal by implementing sustainable land use practices, restoring degraded ecosystems, and conserving important habitats and species. This can be achieved through initiatives such as reforestation, afforestation, and agroforestry projects, as well as conservation programs for threatened species and habitats. Governments, non-governmental organizations (NGOs), and businesses can collaborate to promote sustainable land use and biodiversity conservation, which not only benefits the environment but also supports livelihoods and promotes sustainable economic growth. Through their efforts, they work towards a world where the balance between humans and nature is restored and the vital role that terrestrial ecosystems play in our lives is recognized and protected.',
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
    greendeedDescription:
      'Goal 16 aims to promote just, peaceful, and inclusive societies by supporting the rule of law, human rights, and effective, accountable, and transparent institutions at all levels. Achieving this goal requires the collaboration of various organizations, including governmental bodies, civil society organizations, international organizations, and the private sector. Governments play a critical role in creating a legal framework that protects human rights and ensures accountability. Civil society organizations raise awareness and advocate for human rights and justice, while international organizations provide technical assistance and support to strengthen institutions. The private sector can contribute by promoting transparency and integrity in their own operations and by advocating for inclusive business practices that support sustainable development. Through their combined efforts, these organizations can work towards building just, peaceful, and inclusive societies, thereby contributing to the sustainable development of communities and nations.',
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
    greendeedDescription:
      'Goal 17 aims to strengthen the means of implementation and revitalize the global partnership for sustainable development. To achieve this, organizations across various sectors must work together to enhance cooperation and collaboration at all levels. These organizations include international organizations, government agencies, civil society organizations, the private sector, and philanthropic organizations. Through partnerships and collaboration, they can exchange knowledge, expertise, and resources to support sustainable development initiatives and build a more sustainable future. It is important that these organizations promote inclusive and transparent decision-making processes, ensuring that all voices are heard and that sustainable development priorities are effectively addressed. By working together, they can help to create a world where sustainable development is not just a dream, but a reality for all people.',
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
  featured?: boolean;
  listed?: boolean;
}
