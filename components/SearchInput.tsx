import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { searchInputCallback } from '../helpers/search';
import { useRef } from 'react';
// @ts-ignore
import InputHints from 'react-input-hints';

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
    <div className="relative mr-2 w-full sm:mr-4">
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
      <InputHints
        placeholders={[
          'Project manager',
          'Graphic designer',
          'Sales representative',
          'Marketing director',
          'Customer support',
          'Accountant',
        ]}
        ref={ref}
        onChange={(e: any) => {
          searchInputCallback(e.target.value.toLowerCase(), 'search', router);
        }}
        type="text"
        className="w-ful my-3 border-none bg-transparent pl-10 text-sm text-custom-brown4 placeholder-custom-brown4 focus:outline-none focus:ring-0 sm:text-base"
      />
    </div>
  );
};

export default SearchInput;
