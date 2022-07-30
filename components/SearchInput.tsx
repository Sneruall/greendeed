import { NextRouter, useRouter } from 'next/router';
import React from 'react';

type Props = {
  searchInputCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ searchInputCallback }: Props) => {
  return (
    <div>
      search:{' '}
      <input
        onChange={(e) => {
          searchInputCallback(e);
        }}
        type="text"
        className="my-3 border"
      />
    </div>
  );
};

export default SearchInput;
