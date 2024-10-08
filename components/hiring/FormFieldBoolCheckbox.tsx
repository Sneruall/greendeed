import React from 'react';

type Props = {
  registerId: string;
  checkboxText: string;
  register: any;
  errors: any;
  value?: string;
  callback?: Function;
};

function FormFieldBoolCheckbox({
  registerId,
  checkboxText,
  register,
  errors,
  value,
  callback,
}: Props) {
  return (
    <div className="">
      <input
        value={value}
        type="checkbox"
        id={value}
        {...register(registerId)}
        onClick={callback}
      />
      <label htmlFor={value}> {checkboxText}</label>
      <div className="text-red-500">{errors?.message}</div>
    </div>
  );
}

export default FormFieldBoolCheckbox;
