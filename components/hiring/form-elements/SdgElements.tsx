import Image from 'next/image';
import React, { useState } from 'react';
import { LocationObject, sdgList, sdgs } from '../../../types/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';
import SdgElement from './SdgElement';

type Props = {
  register: any;
  errors: any;
  retrievedSdgs?: sdgs;
};

function SdgElements({ errors, register, retrievedSdgs }: Props) {
  console.log('retrieved sdgs: ' + JSON.stringify(retrievedSdgs));

  const optionList = sdgList.map((sdg) => (
    <SdgElement
      errors={errors}
      register={register}
      sdg={sdg}
      retrievedSdgs={retrievedSdgs}
    />
  ));

  // {retrievedSdgs?.find((sdgObj) => {
  //   return sdgObj.sdg === +sdg.code;
  // })}

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
