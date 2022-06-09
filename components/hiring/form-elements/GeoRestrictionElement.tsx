import React from 'react';
import { geoRestrictions } from '../../../types/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';

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
    <FormFieldBoolCheckbox
      key={option}
      errors={errors?.locationInfo?.geoRestriction}
      registerId="locationInfo.geoRestriction"
      value={option.replace(/\s/g, '').toLocaleLowerCase()}
      register={register}
      checkboxText={option}
      callback={() => {
        if (option === 'Other') {
          setOtherGeoRestriction(
            (prevOtherGeoRestriction) => !prevOtherGeoRestriction
          );
        }
      }}
    />
  ));

  return <div>{optionList}</div>;
}

export default GeoRestrictionElement;
