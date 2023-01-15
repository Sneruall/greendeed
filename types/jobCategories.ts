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
    id: 4,
    name: 'Consultancy',
    slug: 'consultancy',
  },
  {
    id: 5,
    name: 'Marketing',
    slug: 'marketing',
  },
  {
    id: 6,
    name: 'Sales',
    slug: 'sales',
  },
  {
    id: 7,
    name: 'Product',
    slug: 'product',
  },
  {
    id: 8,
    name: 'Business',
    slug: 'business',
  },
  {
    id: 9,
    name: 'Data',
    slug: 'data',
  },
  {
    id: 10,
    name: 'DevOps / Sysadmin',
    slug: 'devops-sysadmin',
  },
  {
    id: 11,
    name: 'Finance / Legal',
    slug: 'finance-legal',
  },
  {
    id: 12,
    name: 'Human Resources',
    slug: 'human-resources',
  },
  {
    id: 13,
    name: 'Quality Assurance',
    slug: 'quality-assurance',
  },
  {
    id: 14,
    name: 'Writing',
    slug: 'writing',
  },
  {
    id: 15,
    name: 'Other',
    slug: 'other',
  },
];
