import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  register: any;
  errors: any;
  option: any;
};

const SdgElement = ({ errors, register, option }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
    setIsChecked((current) => !current);
  };

  return (
    <li className="flex">
      <div className="">
        <input
          type="checkbox"
          id={option.code}
          className="peer hidden"
          onClick={handleChange}
          {...register(`sdg${option.code}`)}
        />
        <label
          htmlFor={option.code}
          className="inline-flex w-full  cursor-pointer items-center justify-between rounded-lg border border-[#D5D3D3] bg-white p-5 text-gray-500 shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] hover:bg-gray-50 hover:text-gray-600 peer-checked:border-green-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
        >
          <div className="block">
            <div className="inline-flex cursor-pointer self-center border-2 transition duration-200 ease-in-out hover:scale-110">
              {' '}
              <Image
                src={'/images/icons/sdg-icons/' + option.code + '.png'}
                width={40}
                height={40}
                objectFit="contain"
                layout="intrinsic"
              />
            </div>
            <div className="w-full font-bold text-custom-brown1">
              {option.name}
            </div>
            {isChecked && (
              <textarea
                placeholder="Tell us about your goal"
                {...register(`sdg${option.code}text`)}
                className="my-2 block w-full rounded-lg border border-[#D5D3D3] bg-white py-3 px-4 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none"
              />
            )}
          </div>
        </label>
        <div className="text-red-500">{errors?.message}</div>
      </div>
    </li>
  );
};

export default SdgElement;
