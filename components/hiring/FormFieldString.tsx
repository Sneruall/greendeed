import React from 'react';

//Todo, convert to setup like FormFieldDropdown.tsx (with props at top separate)

const FormFieldString: React.FC<{
  id: string;
  title?: string;
  placeholder?: string;
  description?: string;
  onChangeMethod?: Function;
  register: any;
  errors: any;
  inputType?: React.HTMLInputTypeAttribute | undefined;
  min?: number;
  max?: number;
  step?: number;
}> = ({
  id,
  title,
  description,
  onChangeMethod,
  register,
  errors,
  placeholder,
  inputType,
  min,
  max,
  step,
}) => {
  return (
    <div className="">
      <label htmlFor={id} className="font-bold text-custom-brown1">
        {title}
      </label>
      <input
        id={id}
        type={inputType ? inputType : 'text'}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        {...register(id)}
        onChange={onChangeMethod}
        className={`my-2 block w-full rounded-lg border border-[#D5D3D3] bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] ${
          errors
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
      <div className="text-red-500">{errors?.message}</div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default FormFieldString;
