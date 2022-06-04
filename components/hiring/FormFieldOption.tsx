import React, { Fragment } from 'react';
import { Location, RemoteLocation } from '../../types/types';

type Props = {
  registerId: string;
  option: any;
  title: string;
  register: any;
  errors: any;
  location: Location | RemoteLocation;
  setLocationState:
    | React.Dispatch<React.SetStateAction<Location>>
    | React.Dispatch<React.SetStateAction<RemoteLocation>>;
};

function FormFieldOption({
  registerId,
  option,
  title,
  register,
  errors,
  location,
  setLocationState,
}: Props) {
  return (
    <div>
      <label htmlFor={option}>{title}</label>
      <input
        type="radio"
        id={option}
        value={option}
        {...register(registerId)}
        checked={location === option}
        onClick={() => setLocationState(option)}
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
