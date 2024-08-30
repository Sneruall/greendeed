import { jobCategoriesList } from '../../../../types/jobCategories';
import { keywordCategoryMap } from './Mappers/keywordCategoryMap';

// Function to map department name or job title to job category
export const mapDepartmentToCategory = (departmentOrTitle: string) => {
  const lowerCasedInput = departmentOrTitle.toLowerCase();

  // Step 1: Check for direct matches first
  const directMatch = jobCategoriesList.find((category) =>
    lowerCasedInput.includes(category.name.toLowerCase())
  );

  if (directMatch) {
    console.log(`Direct match found for: ${directMatch.name}`);

    return directMatch;
  }

  // Step 2: Check for keyword-based partial matches using word boundary regex
  for (const mapping of keywordCategoryMap) {
    for (const keyword of mapping.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i'); // Word boundary regex, case insensitive

      if (regex.test(lowerCasedInput)) {
        console.log(
          `Partial match found for category: ${mapping.category}, keyword: ${keyword}`
        );
        return (
          jobCategoriesList.find(
            (category) => category.name === mapping.category
          ) || {
            id: 35,
            name: 'Other',
            slug: 'other',
          }
        );
      }
    }
  }

  // Step 3: Default to "Other" if no match is found
  console.log(`No match found, returning "Other".`);

  return {
    id: 35,
    name: 'Other',
    slug: 'other',
  };
};
