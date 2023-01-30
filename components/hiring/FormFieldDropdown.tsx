import React from 'react';

type Props = {
  id: string;
  title?: string;
  options: string[];
  register: any;
  errors: any;
  onChangeMethod?: Function;
  twinleft?: boolean;
  twinright?: boolean;
  placeholder?: string;
};

const FormFieldDropdown = ({
  id,
  title,
  register,
  errors,
  options,
  onChangeMethod,
  twinleft,
  twinright,
  placeholder,
}: Props) => {
  const optionList = options.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  return (
    <div>
      <label htmlFor={id} className="font-bold text-custom-brown1">
        {title}
      </label>
      <select
        {...register(id)}
        onChange={onChangeMethod}
        id={id}
        className={`my-2 block w-full rounded-lg border bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none ${
          twinleft && 'rounded-r-none'
        } ${twinright && 'rounded-l-none'}`}
      >
        {placeholder && (
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
        )}
        {optionList}
      </select>
      <div className="text-red-500">{errors?.message}</div>
    </div>
  );
};

export default FormFieldDropdown;
