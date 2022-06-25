export type jobCategories = jobCategory[];

export type jobCategory = {
  id: number;
  name: string;
  slug: string;
};

export const generateCategoriesArray = () => {
  return jobCategoriesList.map((category) => category.name).sort();
};

export const jobCategoriesList: jobCategory[] = [
  {
    id: 1,
    name: 'IT',
    slug: 'it',
  },
  {
    id: 2,
    name: 'Operations',
    slug: 'operations',
  },
  {
    id: 3,
    name: 'Manufacturing',
    slug: 'manufacturing',
  },
  {
    id: 3,
    name: 'Consultancy',
    slug: 'consultancy',
  },
  {
    id: 4,
    name: 'Other',
    slug: 'other',
  },
];
