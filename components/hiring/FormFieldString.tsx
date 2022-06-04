import React from 'react';

const FormFieldString: React.FC<{
  id: string;
  title: string;
  description?: string;
  onChangeMethod?: Function;
  register: any;
  errors: any;
}> = ({ id, title, description, onChangeMethod, register, errors }) => {
  return (
    <div className="form-group">
      <label className="font-bold">{title}</label>
      <input
        type="text"
        {...register(id)}
        onChange={onChangeMethod}
        className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
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
