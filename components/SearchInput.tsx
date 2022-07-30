import { NextRouter, useRouter } from 'next/router';
import React from 'react';

type Props = {
  searchInputCallback: (e: String) => void;
};

const SearchInput = ({ searchInputCallback }: Props) => {
  return (
    <div>
      search:{' '}
      <input
        onChange={(e) => {
          searchInputCallback(e.target.value);
        }}
        type="text"
        className="my-3 border"
      />
    </div>
  );
};

export default SearchInput;
