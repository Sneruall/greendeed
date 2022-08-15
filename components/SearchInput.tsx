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
    <div>
      search:{' '}
      <input
        ref={ref}
        onChange={(e) => {
          searchInputCallback(e.target.value.toLowerCase(), 'search', router);
        }}
        type="text"
        className="my-3 border"
      />
    </div>
  );
};

export default SearchInput;
