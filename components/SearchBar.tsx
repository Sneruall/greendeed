import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { searchInputCallback } from '../helpers/search';
import {
  getJobCategoriesListWithPlaceholder,
  SearchInputType,
} from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import SearchInput from './SearchInput';
export const SearchBar = () => {
  return (
    <div className="my-2 flex justify-center space-x-2">
      <SearchInput />
      <CategoryDropdown />
    </div>
  );
};
