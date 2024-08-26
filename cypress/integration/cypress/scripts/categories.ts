import { jobCategoriesList } from '../../../../types/jobCategories';
// Function to map department name to job category

export const mapDepartmentToCategory = (department: string) => {
  const lowerCasedDepartment = department.toLowerCase();
  return (
    jobCategoriesList.find((category) =>
      lowerCasedDepartment.includes(category.name.toLowerCase())
    ) || {
      id: 35,
      name: 'Other', // If no match, return the department as is
      slug: 'other',
    }
  );
};
