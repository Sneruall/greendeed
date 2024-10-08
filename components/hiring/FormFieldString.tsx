import React from 'react';

const FormFieldString: React.FC<{
  id: string;
  title?: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  onChangeMethod?: Function;
  register: any;
  errors?: any;
  inputType?: React.HTMLInputTypeAttribute | undefined;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}> = ({
  id,
  title,
  description,
  defaultValue,
  onChangeMethod,
  register,
  errors,
  placeholder,
  inputType,
  min,
  max,
  step,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="font-bold text-custom-brown1">
        {title}
      </label>
      <p className="text-sm text-gray-500">{description}</p>
      <input
        id={id}
        type={inputType ? inputType : 'text'}
        placeholder={placeholder}
        min={min}
        max={max}
        value={defaultValue}
        step={step}
        {...register(id)}
        onChange={onChangeMethod}
        className={`my-2 block w-full rounded-lg border border-[#D5D3D3] bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none ${
          errors
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
      <div className="text-red-500">{errors?.message}</div>
    </div>
  );
};

export default FormFieldString;
