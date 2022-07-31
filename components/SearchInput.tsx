import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { SearchInputType } from '../types/jobCategories';

type Props = {
  searchInputCallback: (
    value: String,
    searchInputType: SearchInputType
  ) => void;
};

const SearchInput = ({ searchInputCallback }: Props) => {
  return (
    <div>
      search:{' '}
      <input
        onChange={(e) => {
          searchInputCallback(e.target.value, 'search');
        }}
        type="text"
        className="my-3 border"
      />
    </div>
  );
};

export default SearchInput;
