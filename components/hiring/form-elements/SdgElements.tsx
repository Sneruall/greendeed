import Image from 'next/image';
import React, { useState } from 'react';
import { LocationObject, sdgList } from '../../../types/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';
import SdgElement from './SdgElement';

type Props = {
  register: any;
  errors: any;
};

function SdgElements({ errors, register }: Props) {
  const optionList = sdgList.map((option) => (
    <SdgElement
      key={option.code}
      errors={errors}
      register={register}
      option={option}
    />
  ));

  return (
    <>
      <ul className="grid auto-rows-max grid-cols-5 gap-1 sm:gap-4">
        {optionList}
      </ul>
      <div className="text-red-500">{errors?.message}</div>
    </>
  );
}

export default SdgElements;
