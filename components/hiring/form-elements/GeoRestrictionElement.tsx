import React from 'react';
import FormFieldOption from '../FormFieldOption';
import { geoRestrictions } from '../../../types/types';

type Props = {
  register: any;
  errors: any;
  setOtherGeoRestriction: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
};

function GeoRestrictionElement({
  errors,
  register,
  setOtherGeoRestriction,
}: Props) {
  const optionList = geoRestrictions.map((option) => (
    <FormFieldOption
      key={option}
      errors={errors?.locationInfo?.geoRestriction}
      registerId="locationInfo.geoRestriction"
      option={option.replace(/\s/g, '').toLocaleLowerCase()}
      inputType="checkbox"
      register={register}
      title={option}
      setOtherGeoRestriction={setOtherGeoRestriction}
    />
  ));

  return <div>{optionList}</div>;
}

export default GeoRestrictionElement;
