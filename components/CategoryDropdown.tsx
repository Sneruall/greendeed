import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  getJobCategoriesListWithPlaceholder,
  jobCategory,
  SearchInputType,
} from '../types/jobCategories';

type Props = {
  searchInputCallback: (
    search: String,
    searchInputType: SearchInputType
  ) => void;
};

const CategoryDropdown = ({ searchInputCallback }: Props) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  //   const setCategoryQuery = (value: String) => {
  //     if (value) {
  //       router.push({
  //         query: {
  //           category: value?.toString(),
  //         },
  //       });
  //     } else {
  //       router.replace('/', undefined);
  //     }
  //   };

  return (
    <div className="">
      <label
        htmlFor="category"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Category
      </label>
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
