import React from 'react';
import { LocationObject, sdgList } from '../../../types/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';

type Props = {
  register: any;
  errors: any;
  setSdgs: React.Dispatch<React.SetStateAction<string[]>>;
};

function SdgElement({ errors, register, setSdgs }: Props) {
  const optionList = sdgList.map((option) => (
    <FormFieldBoolCheckbox
      key={option.name}
      errors={errors?.sdgs}
      registerId="sdg"
      value={option.name}
      register={register}
      checkboxText={option.name}
      callback={() => {
        console.log('hoi');
      }}
    />
  ));

  return <div>{optionList}</div>;
}

export default SdgElement;
