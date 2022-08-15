import React, { useState } from 'react';
import {
  getJobCategoriesListWithPlaceholder,
  SearchInputType,
} from '../types/jobCategories';

type Props = {
  searchInputCallback: (
    search: String,
    searchInputType: SearchInputType
  ) => void;
};

const CategoryDropdown = ({ searchInputCallback }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="">
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          searchInputCallback(e.target.value, 'category');
        }}
        id="category"
        className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
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
