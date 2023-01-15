import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { searchInputCallback } from '../helpers/search';
// @ts-ignore
import InputHints from 'react-input-hints';

const SearchInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (router.query.search) {
      setInputValue(router.query.search.toString());
    } else if (!router.query.search) {
      setInputValue('');
    }
  }, [router.basePath]);

  useEffect(() => {
    searchInputCallback(inputValue.toLowerCase(), 'search', router);
  }, [inputValue]);

  return (
    <div className="relative mr-2 w-full sm:mr-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
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
        value={inputValue}
        onChange={(e: any) => {
          setInputValue(e.target.value);
        }}
        className="w-ful my-3 border-none bg-transparent pl-10 text-sm text-custom-brown4 placeholder-custom-brown4 focus:outline-none focus:ring-0 sm:text-base"
      />
    </div>
  );
};

export default SearchInput;
