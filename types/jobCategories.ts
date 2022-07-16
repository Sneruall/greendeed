export type jobCategories = jobCategory[];

export interface jobCategory {
  id: number;
  name: string;
  slug: string;
}

export const generateCategoriesArray = () => {
  return jobCategoriesList.map((category) => category.name).sort();
};

export const jobCategoriesList: jobCategory[] = [
  {
    id: 1,
    name: 'Software Development',
    slug: 'software-development',
  },
  {
    id: 2,
    name: 'Customer Service',
    slug: 'customer-service',
  },
  {
    id: 3,
    name: 'Design',
    slug: 'design',
  },
  {
    id: 3,
    name: 'Consultancy',
    slug: 'consultancy',
  },
  {
    id: 4,
    name: 'Marketing',
    slug: 'marketing',
  },
  {
    id: 5,
    name: 'Sales',
    slug: 'sales',
  },
  {
    id: 6,
    name: 'Product',
    slug: 'product',
  },
  {
    id: 7,
    name: 'Business',
    slug: 'business',
  },
  {
    id: 8,
    name: 'Data',
    slug: 'data',
  },
  {
    id: 9,
    name: 'DevOps / Sysadmin',
    slug: 'devops-sysadmin',
  },
  {
    id: 10,
    name: 'Finance / Legal',
    slug: 'finance-legal',
  },
  {
    id: 11,
    name: 'Human Resources',
    slug: 'human-resources',
  },
  {
    id: 12,
    name: 'Quality Assurance',
    slug: 'quality-assurance',
  },
  {
    id: 13,
    name: 'Writing',
    slug: 'writing',
  },
  {
    id: 14,
    name: 'Other',
    slug: 'other',
  },
];
