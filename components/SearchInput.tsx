import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

let timer: ReturnType<typeof setTimeout>;

const SearchInput = (props: Props) => {
  const router = useRouter();

  const searchInputCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (e.target.value) {
        router.push({
          query: {
            search: e.target.value,
          },
        });
      } else {
        router.replace('/', undefined);
      }
    }, 300);
  };
  return (
    <div>
      {' '}
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
