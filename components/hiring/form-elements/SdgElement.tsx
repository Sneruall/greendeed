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
      key={option.code}
      errors={errors?.sdgs}
      registerId="sdg"
      value={option.code}
      register={register}
      checkboxText={' ' + option.name}
      callback={() => {
        console.log('hoi');
      }}
    />
  ));

  return <div className="grid grid-cols-3">{optionList}</div>;
}

export default SdgElement;
