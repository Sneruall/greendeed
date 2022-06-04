import React from 'react';

type Props = {
  id: string;
  title: string;
  register: any;
  errors: any;
};

const FormFieldDropdown = ({ id, title, register, errors }: Props) => {
  return (
    <div className="form-group">
      <label
        htmlFor="category"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {title}
      </label>
      <select
        {...register(id)}
        id="category"
        className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
      >
        {/* Todo: make the categories complete: https://tallo.com/blog/types-of-careers/ https://www.recruiter.com/careers/ */}
        <option>Software Development</option>
        <option>Customer Support</option>
        <option>Design</option>
        <option>DevOps and Sysadmin</option>
        <option>Sales and Marketing</option>
        <option>Legal and Finance</option>
        <option>Operations</option>
        <option>Management</option>
        <option>Non-tech</option>
        <option>Product</option>
        <option>Business</option>
        <option>Data</option>
        <option>Human Resources</option>
        <option>Writing</option>
        <option>Other</option>
      </select>
      <div className="text-red-500">{errors?.message}</div>
    </div>
  );
};

export default FormFieldDropdown;
