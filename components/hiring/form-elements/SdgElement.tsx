import Image from 'next/image';
import React from 'react';
import { LocationObject, sdgList } from '../../../customtypes/types';
import FormFieldBoolCheckbox from '../FormFieldBoolCheckbox';

type Props = {
  register: any;
  errors: any;
  setSdgs: React.Dispatch<React.SetStateAction<string[]>>;
};

function SdgElement({ errors, register, setSdgs }: Props) {
  const optionList = sdgList.map((option) => (
    <li className="flex" key={option.code}>
      <div className="">
        <input
          value={option.code}
          type="checkbox"
          id={option.code}
          {...register('sdg')}
          className="peer hidden"
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
          </div>
        </label>
        <div className="text-red-500">{errors?.sdgs?.message}</div>
      </div>
    </li>
  ));

  return <ul className="flex flex-wrap gap-6">{optionList}</ul>;
}

export default SdgElement;
