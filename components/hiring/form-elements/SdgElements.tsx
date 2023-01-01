import React from 'react';
import { Company, sdgList, sdgs } from '../../../types/types';
import SdgElement from './SdgElement';

type Props = {
  register: any;
  errors: any;
  retrievedSdgs?: sdgs;
  setRetrievedCompanyData: React.Dispatch<
    React.SetStateAction<Company | undefined>
  >;
};

function SdgElements({
  errors,
  register,
  retrievedSdgs,
  setRetrievedCompanyData,
}: Props) {
  console.log('retrieved sdgs: ' + JSON.stringify(retrievedSdgs));

  const optionList = sdgList.map((sdg) => (
    <SdgElement
      errors={errors}
      register={register}
      sdg={sdg}
      retrievedSdgs={retrievedSdgs}
      setRetrievedCompanyData={setRetrievedCompanyData}
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
