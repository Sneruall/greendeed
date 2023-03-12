export type jobCategories = jobCategory[];

export interface jobCategory {
  id: number;
  name: string;
  slug: string;
}

export const generateCategoriesArray = (placeholder?: string) => {
  const categoriesArray = jobCategoriesList
    .map((category) => category.name)
    .sort();
  if (placeholder) {
    jobCategoriesList.unshift({
      id: 0,
      name: placeholder,
      slug: '',
    });
  }
  return categoriesArray;
};

export const getJobCategoriesListWithPlaceholder = (placeholder: string) => {
  const jobCategories = [...jobCategoriesList];
  jobCategories.unshift({
    id: 0,
    name: placeholder,
    slug: '',
  });
  return jobCategories;
};

export type SearchInputType = 'search' | 'category' | 'sdgs';

export const jobCategoriesList: jobCategory[] = [
  {
    id: 1,
    name: 'Accounting and Finance',
    slug: 'accounting-and-finance',
  },
  {
    id: 2,
    name: 'Administration and Office Support',
    slug: 'administration-and-office-support',
  },
  {
    id: 3,
    name: 'Advertising and Marketing',
    slug: 'advertising-and-marketing',
  },
  {
    id: 4,
    name: 'Architecture and Engineering',
    slug: 'architecture-and-engineering',
  },
  {
    id: 5,
    name: 'Art, Fashion, and Design',
    slug: 'art-fashion-and-design',
  },
  {
    id: 6,
    name: 'Business Operations and Management',
    slug: 'business-operations-and-management',
  },
  {
    id: 7,
    name: 'Consulting and Project Management',
    slug: 'consulting-and-project-management',
  },
  {
    id: 8,
    name: 'Customer Service and Support',
    slug: 'customer-service-and-support',
  },
  {
    id: 9,
    name: 'Data Science and Analytics',
    slug: 'data-science-and-analytics',
  },
  {
    id: 10,
    name: 'Education and Training',
    slug: 'education-and-training',
  },
  {
    id: 11,
    name: 'Environmental and Agriculture',
    slug: 'environmental-and-agriculture',
  },
  {
    id: 12,
    name: 'Health and Wellness',
    slug: 'health-and-wellness',
  },
  {
    id: 13,
    name: 'Hospitality and Tourism',
    slug: 'hospitality-and-tourism',
  },
  {
    id: 14,
    name: 'Human Resources',
    slug: 'human-resources',
  },
  {
    id: 15,
    name: 'Information Technology and Computer Science',
    slug: 'information-technology-and-computer-science',
  },
  {
    id: 16,
    name: 'Legal',
    slug: 'legal',
  },
  {
    id: 17,
    name: 'Logistics and Transportation',
    slug: 'logistics-and-transportation',
  },
  {
    id: 18,
    name: 'Manufacturing and Production',
    slug: 'manufacturing-and-production',
  },
  {
    id: 19,
    name: 'Media and Communication',
    slug: 'media-and-communication',
  },
  {
    id: 20,
    name: 'Military and Government',
    slug: 'military-and-government',
  },
  {
    id: 21,
    name: 'Nonprofit and Social Services',
    slug: 'nonprofit-and-social-services',
  },
  {
    id: 22,
    name: 'Nursing and Healthcare',
    slug: 'nursing-and-healthcare',
  },
  {
    id: 23,
    name: 'Photography, Video, and Animation',
    slug: 'photography-video-and-animation',
  },
  {
    id: 24,
    name: 'Real Estate and Property Management',
    slug: 'real-estate-and-property-management',
  },
  {
    id: 25,
    name: 'Retail and Consumer Goods',
    slug: 'retail-and-consumer-goods',
  },
  {
    id: 26,
    name: 'Sales and Marketing',
    slug: 'sales-and-marketing',
  },
  {
    id: 27,
    name: 'Science and Research',
    slug: 'science-and-research',
  },
  {
    id: 28,
    name: 'Social Media and Marketing',
    slug: 'social-media-and-marketing',
  },
  {
    id: 29,
    name: 'Software Development',
    slug: 'software-development',
  },
  {
    id: 30,
    name: 'Sports and Entertainment',
    slug: 'sports-and-entertainment',
  },
  {
    id: 31,
    name: 'Technical Writing and Translation',
    slug: 'technical-writing-and-translation',
  },
  {
    id: 32,
    name: 'Telecommunications and Networking',
    slug: 'telecommunications-and-networking',
  },
  {
    id: 33,
    name: 'Travel and Hospitality',
    slug: 'travel-and-hospitality',
  },
  {
    id: 34,
    name: 'Web and Mobile Development',
    slug: 'web-and-mobile-development',
  },
];
