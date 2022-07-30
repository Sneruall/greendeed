import { useRouter } from 'next/router';
import React from 'react';
import { getJobCategoriesListWithPlaceholder } from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import SearchInput from './SearchInput';

type Props = {};

let timer: ReturnType<typeof setTimeout>;

export const SearchBar = (props: Props) => {
  const router = useRouter();

  const searchInputCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (e.target.value && router.query.category) {
        router.push({
          query: {
            search: e.target.value,
            category: router.query.category,
          },
        });
      } else if (e.target.value) {
        router.push({
          query: {
            search: e.target.value,
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
