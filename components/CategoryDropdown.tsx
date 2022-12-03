import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { searchInputCallback } from '../helpers/search';
import {
  getJobCategoriesListWithPlaceholder,
  SearchInputType,
} from '../types/jobCategories';

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const router = useRouter();

  useEffect(() => {
    // if there is no category in query but input is set, reset input field
    if (
      !router.asPath.includes('category') &&
      selectedCategory != 'All Categories'
    ) {
      setSelectedCategory('All Categories');
    }
  }, [router.asPath]);

  return (
    <div className="w-80 self-center">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          searchInputCallback(e.target.value, 'category', router);
        }}
        id="category"
        className="block w-full border-none bg-transparent"
      >
        {getJobCategoriesListWithPlaceholder('All categories').map((option) => (
          <option value={option.slug} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
