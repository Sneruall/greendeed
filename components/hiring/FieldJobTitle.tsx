import React from 'react';

const FieldJobTitle: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  return (
    <div className="form-group">
      <label className="font-bold">Job Title</label>
      <input
        type="text"
        {...register('jobTitle')}
        className={`block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${
          errors.jobTitle
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300  focus:border-blue-500 focus:ring-blue-500'
        }`}
      />
      <div className="text-red-500">{errors.jobTitle?.message}</div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please specify as single job position like "Marketing Manager" or "Node
        JS Developer", not a sentence like "Looking for PM / Biz Dev / Manager".
        We know your job is important but please DO NOT WRITE IN FULL CAPS. If
        posting multiple roles, please create multiple job posts. A job post is
        limited to a single job. We only allow real jobs, absolutely no MLM-type
        courses "learn how to work online" please.
      </p>
    </div>
  );
};

export default FieldJobTitle;
