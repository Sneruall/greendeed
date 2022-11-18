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

  return <ul className="flex flex-wrap gap-6">{optionList}</ul>;
}

export default SdgElements;
