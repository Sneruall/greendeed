import { useRouter } from 'next/router';
import React from 'react';
import { getJobCategoriesListWithPlaceholder } from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import SearchInput from './SearchInput';

type Props = {};

let timer: ReturnType<typeof setTimeout>;

export const SearchBar = (props: Props) => {
  const router = useRouter();

  const searchInputCallback = (search: String, isCategory?: Boolean) => {
    // todo: account for empty values (resetting of everything) + refactoring

    if (!isCategory) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (search && router.query.category) {
          router.push({
            query: {
              search: search.toString(),
              category: router.query.category,
            },
          });
        } else if (search) {
          router.push({
            query: {
              search: search.toString(),
            },
          });
        } else {
          if (router.query.category) {
            router.push({
              query: {
                category: router.query.category,
              },
            });
          } else {
            router.replace('/', undefined);
          }
        }
      }, 300);
    } else {
      if (search && router.query.search) {
        router.push({
          query: {
            search: router.query.search,
            category: search?.toString(),
          },
        });
      } else if (search) {
        router.push({
          query: {
            category: search?.toString(),
          },
        });
      } else {
        if (router.query.search) {
          router.push({
            query: {
              search: router.query.search,
            },
          });
        } else {
          router.replace('/', undefined);
        }
      }
    }
  };

  return (
    <div>
      <SearchInput searchInputCallback={searchInputCallback} />
      <CategoryDropdown searchInputCallback={searchInputCallback} />
    </div>
  );
};
