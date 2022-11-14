import React from 'react';
import { geoRestrictions, LocationObject } from '../../../customtypes/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';

type Props = {
  register: any;
  errors: any;
  setLocationObject: React.Dispatch<React.SetStateAction<LocationObject>>;
};

function GeoRestrictionElement({ errors, register, setLocationObject }: Props) {
  const optionList = geoRestrictions.map((option) => (
    <FormFieldBoolCheckbox
      key={option.id}
      errors={errors?.locationInfo?.geoRestriction}
      registerId="locationInfo.geoRestriction"
      value={option.title}
      register={register}
      checkboxText={option.title}
      callback={() => {
        if (option.value === 'other') {
          setLocationObject((prevState) => ({
            ...prevState,
            otherGeoRestriction: !prevState.otherGeoRestriction,
          }));
        }
      }}
    />
  ));

  return <div className="my-2 flex gap-4">{optionList}</div>;
}

export default GeoRestrictionElement;
