import React from 'react';

type Props = {
  registerId: string;
  checkboxText: string;
  register: any;
  errors: any;
};

function FormFieldBoolCheckbox({
  registerId,
  checkboxText,
  register,
  errors,
}: Props) {
  return (
    <div className="">
      <input type="checkbox" id={registerId} {...register(registerId)} />
      <label htmlFor={registerId}>{checkboxText}</label>
      <div className="text-red-500">{errors?.digitalCurrency?.message}</div>
    </div>
  );
}

export default FormFieldBoolCheckbox;
