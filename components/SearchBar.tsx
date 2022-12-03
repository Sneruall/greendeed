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
import SearchInput from './SearchInput';
export const SearchBar = () => {
  return (
    <div className="site-margins bg-gray-300 pb-32">
      <div className="mx-auto max-w-4xl pt-24 sm:pt-32">
        <h1 className="heading-2xl mx-auto mb-6 max-w-2xl text-center leading-relaxed">
          Let's find your next Sustainable Job
        </h1>
      </div>
      <div className="mx-auto h-32 max-w-xl">
        <div className="flex h-full w-full text-center">
          <div className="flex-1"></div>
          <div className="relative h-full w-64 flex-initial">
            <Image
              src={'/images/home/temp.png'}
              objectFit="contain"
              layout="fill"
            />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="shadow-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-custom-green2 px-10 font-omnes font-semibold text-custom-brown4">
          <SearchInput />
          <div className="mr-4 h-1/2 w-1 border-l border-black"></div>
          <CategoryDropdown />
        </div>
      </div>
    </div>

    //   <div className="w-[600px] flex-initial self-end">
    // <Image
    //   src={'/images/home/flagman.png'}
    //   width={600}
    //   height={600}
    //   objectFit="contain"
    //   layout="responsive"
    // />
    //   </div>        </div>

    // </div>
  );
};
