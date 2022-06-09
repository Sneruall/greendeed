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
        id={registerId}
        {...register(registerId)}
        onClick={callback}
      />
      <label htmlFor={registerId}>{checkboxText}</label>
      <div className="text-red-500">{errors?.digitalCurrency?.message}</div>
    </div>
  );
}

export default FormFieldBoolCheckbox;
