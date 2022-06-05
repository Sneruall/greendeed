import React from 'react';

type Props = {
  id: string;
  title?: string;
  options: string[];
  register: any;
  errors: any;
  onChangeMethod?: Function;
};

const FormFieldDropdown = ({
  id,
  title,
  register,
  errors,
  options,
  onChangeMethod,
}: Props) => {
  const optionList = options.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  return (
    <div className="form-group">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {title}
      </label>
      <select
        {...register(id)}
        onChange={onChangeMethod}
        id={id}
        className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 "
      >
        {optionList}
      </select>
      <div className="text-red-500">{errors?.message}</div>
    </div>
  );
};

export default FormFieldDropdown;
