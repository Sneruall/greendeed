import React from 'react';
import { getJobCategoriesListWithPlaceholder } from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import SearchInput from './SearchInput';

type Props = {};

export const SearchBar = (props: Props) => {
  return (
    <div>
      <SearchInput />
      <CategoryDropdown
        options={getJobCategoriesListWithPlaceholder('All categories')}
      />
    </div>
  );
};
