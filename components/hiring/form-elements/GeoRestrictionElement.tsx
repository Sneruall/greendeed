import React from 'react';
import { geoRestrictions, LocationObject } from '../../../types/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';

type Props = {
  register: any;
  errors: any;
  setLocationObject: React.Dispatch<React.SetStateAction<LocationObject>>;
};

function GeoRestrictionElement({ errors, register, setLocationObject }: Props) {
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
          setLocationObject((prevState) => ({
            ...prevState,
            otherGeoRestriction: !prevState.otherGeoRestriction,
          }));
        }
      }}
    />
  ));

  return <div>{optionList}</div>;
}

export default GeoRestrictionElement;
