import { NextRouter } from 'next/router';
import { SearchInputType } from '../types/jobCategories';

let timer: ReturnType<typeof setTimeout>;

export const searchInputCallback = (
  value: String,
  searchInputType: SearchInputType,
  router: NextRouter
) => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    // if there is no value, then we want to remove the query param that belongs to it.
    if (!value) {
      const { pathname } = router;
      const params = new URLSearchParams(window.location.search);
      params.delete(searchInputType);
      router.replace({ pathname, query: params.toString() }, undefined);
      // if there is a value, then we want to add the query param that belongs to it.
    } else {
      router.push(
        {
          query: {
            ...router.query,
            [searchInputType]: value.toString(),
          },
        },
        undefined,
        { scroll: false }
      );
    }
  }, 300);
};
