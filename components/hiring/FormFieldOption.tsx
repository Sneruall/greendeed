import React, { Fragment } from 'react';
import { Location } from '../../types/types';

type Props = {
  id: string;
  option: any;
  title: string;
  register: any;
  errors: any;
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
};

function FormFieldOption({
  id,
  option,
  title,
  register,
  errors,
  location,
  setLocation,
}: Props) {
  return (
    <div>
      <label htmlFor={option}>{title}</label>
      <input
        type="radio"
        id={option}
        value={option}
        {...register(id)}
        checked={location === option}
        onClick={() => setLocation(option)}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  ${
          errors
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
    </div>
  );
}

export default FormFieldOption;
