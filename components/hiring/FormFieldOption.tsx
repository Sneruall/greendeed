import React, { Fragment } from 'react';
import { Location, RemoteLocation } from '../../types/types';

type Props = {
  registerId: string;
  option: any;
  inputType?: React.HTMLInputTypeAttribute | undefined;
  title: string;
  register: any;
  errors: any;
  location?: Location | RemoteLocation;
  setLocationState?:
    | React.Dispatch<React.SetStateAction<Location>>
    | React.Dispatch<React.SetStateAction<RemoteLocation>>;
  setOtherGeoRestriction?: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
};

function FormFieldOption({
  registerId,
  option,
  inputType,
  title,
  register,
  errors,
  location,
  setLocationState,
  setOtherGeoRestriction,
}: Props) {
  const callback = (e: React.FormEvent<HTMLInputElement>) => {
    if (setLocationState) {
      setLocationState(option);
    }
    if (setOtherGeoRestriction && option === 'other') {
      setOtherGeoRestriction(
        (prevOtherGeoRestriction) => !prevOtherGeoRestriction
      );
    }
  };

  return (
    <div>
      <label htmlFor={option}>{title}</label>
      <input
        type={inputType ? inputType : 'radio'}
        id={option}
        value={option}
        {...register(registerId)}
        checked={location && location === option}
        onChange={callback}
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
