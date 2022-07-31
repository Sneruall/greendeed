import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import {
  getJobCategoriesListWithPlaceholder,
  SearchInputType,
} from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import SearchInput from './SearchInput';

type Props = {};

let timer: ReturnType<typeof setTimeout>;

export const SearchBar = (props: Props) => {
  const router = useRouter();

  const searchInputCallback = (
    value: String,
    searchInputType: SearchInputType
  ) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // if there is no value, then we want to remove the query param that belongs to it.
      if (!value) {
        const { pathname } = router;
        const params = new URLSearchParams(window.location.search);
        params.delete(searchInputType);
        router.replace({ pathname, query: params.toString() }, undefined);
        // if there is a value, then we want to add the query param that belongs to it.
      } else {
        router.push({
          query: {
            ...router.query,
            [searchInputType]: value.toString(),
          },
        });
      }
    }, 300);
  };

  return (
    <div className="my-2 flex justify-center space-x-2">
      <SearchInput searchInputCallback={searchInputCallback} />
      <CategoryDropdown searchInputCallback={searchInputCallback} />
    </div>
  );
};
