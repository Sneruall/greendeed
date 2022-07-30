import { useRouter } from 'next/router';
import React from 'react';
import { getJobCategoriesListWithPlaceholder } from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import SearchInput from './SearchInput';

type Props = {};

let timer: ReturnType<typeof setTimeout>;

export const SearchBar = (props: Props) => {
  const router = useRouter();

  const searchInputCallback = (value: String) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (value && router.query.category) {
        router.push({
          query: {
            search: value.toString(),
            category: router.query.category,
          },
        });
      } else if (value) {
        router.push({
          query: {
            search: value.toString(),
          },
        });
      } else {
        router.replace('/', undefined);
      }
    }, 300);
  };

  return (
    <div>
      <SearchInput searchInputCallback={searchInputCallback} />
      <CategoryDropdown />
    </div>
  );
};
