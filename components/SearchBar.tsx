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

  //   Function to remove a specific query from the url
  //   const removeQueryParam = (param: string) => {
  //     const { pathname, query } = router;
  //     const params = new URLSearchParams(query);
  //     params.delete(param);
  //     router.replace({ pathname, query: params.toString() }, undefined, {
  //       shallow: true,
  //     });
  //   };

  const searchInputCallback = (
    value: String,
    searchInputType: SearchInputType
  ) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!value && !router.query) {
        router.replace('/', undefined);
      }
      //   if (!value && router.query) {
      //     // remove the query param because it is empty (we remove query of searchInputType)
      //   }
      else {
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
    <div>
      <SearchInput searchInputCallback={searchInputCallback} />
      <CategoryDropdown searchInputCallback={searchInputCallback} />
    </div>
  );
};
