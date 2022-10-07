import Image from 'next/image';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { searchInputCallback } from '../helpers/search';
import {
  getJobCategoriesListWithPlaceholder,
  SearchInputType,
} from '../types/jobCategories';
import CategoryDropdown from './CategoryDropdown';
import HeroText from './HeroText';
import SearchInput from './SearchInput';
export const SearchBar = () => {
  return (
    <div className="my-10 flex justify-between gap-8 px-4">
      <div className="flex flex-col self-center">
        <div>
          <HeroText />
        </div>
        <div className="md:flex lg:gap-2">
          <SearchInput />
          <CategoryDropdown />
        </div>
      </div>
      <div className="w-[600px] flex-initial self-end">
        <Image
          src={'/images/home/flagman.png'}
          width={600}
          height={600}
          objectFit="contain"
          layout="responsive"
        />
      </div>
    </div>
  );
};
