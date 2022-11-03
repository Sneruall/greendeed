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
    <div className="">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <select
        {...register(id)}
        onChange={onChangeMethod}
        id={id}
        className="my-2 block w-full rounded-lg border bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none"
      >
        {optionList}
      </select>
      <div className="text-red-500">{errors?.message}</div>
    </div>
  );
};

export default FormFieldDropdown;
