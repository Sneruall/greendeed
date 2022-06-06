import React from 'react';

type Props = {
  registerId: string;
  title: string;
  value: string;
  register: any;
  errors: any;
  state?: any;
  callback?: Function;
};

function FormFieldRadio({
  registerId,
  title,
  register,
  errors,
  value,
  state,
  callback,
}: Props) {
  return (
    <>
      <label htmlFor={value}>{title}</label>
      <input
        type="radio"
        id={value}
        value={value}
        checked={state === value}
        onClick={callback}
        {...register(registerId)}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
          errors?.applicationMethod
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
      <div className="text-red-500">{errors?.applicationMethod?.message}</div>
    </>
  );
}

export default FormFieldRadio;
