import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { searchInputCallback } from '../helpers/search';
import { SearchInputType } from '../types/jobCategories';
import { useRef } from 'react';

const SearchInput = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // if there is no search in query but input is set, reset input field
    if (!router.asPath.includes('search') && ref.current != null) {
      ref.current.value = '';
    }
  }, [router.asPath]);

  return (
    <div className="relative mr-4 w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          className="h-6 w-6"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      <input
        placeholder="Search sustainable jobs..."
        ref={ref}
        onChange={(e) => {
          searchInputCallback(e.target.value.toLowerCase(), 'search', router);
        }}
        type="text"
        className="my-3 w-full border-none bg-transparent pl-10 text-custom-brown4 placeholder-custom-brown4 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

{
  /* <span class="absolute inset-y-0 left-0 flex items-center pl-2">
<button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
</button> */
}
// </span>

export default SearchInput;
