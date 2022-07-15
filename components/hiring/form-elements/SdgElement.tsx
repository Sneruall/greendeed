import React from 'react';
import { geoRestrictions, LocationObject } from '../../../types/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';

type Props = {
  register: any;
  errors: any;
  setSdgs: React.Dispatch<React.SetStateAction<LocationObject>>;
};

function SdgElement({ errors, register, setSdgs }: Props) {
  const optionList = geoRestrictions.map((option) => (
    <FormFieldBoolCheckbox
      key={option}
      errors={errors?.sdgs}
      registerId="sdgs"
      value={option}
      register={register}
      checkboxText={option}
      callback={() => {
        if (option === 'Other') {
          setSdgs((prevState) => ({
            ...prevState,
            otherGeoRestriction: !prevState.otherGeoRestriction,
          }));
        }
      }}
    />
  ));

  return <div>{optionList}</div>;
}

export default SdgElement;
