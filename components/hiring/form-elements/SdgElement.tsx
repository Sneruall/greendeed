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
    <li className={`${isChecked && 'col-span-2 row-span-2'}`}>
      <div
        className={`shadow-1 h-full rounded-lg border-2 border-custom-grey3 bg-white p-1`}
      >
        <label htmlFor={option.code} className="w-full cursor-pointer">
          <div className="mb-2 flex">
            <input
              type="checkbox"
              id={option.code}
              className="peer h-4 w-4 cursor-pointer rounded-full bg-transparent text-black focus:ring-0"
              onClick={handleChange}
              {...register(`companyData.sdgInfo.sdg${option.code}`)}
            />
            <div className="w-full"></div>
          </div>

          <div className="m-1 block">
            <div className="inline-flex cursor-pointer self-center transition duration-200 ease-in-out">
              <Image
                src={'/images/icons/sdg-icons/' + option.code + '.png'}
                width={100}
                height={100}
                objectFit="contain"
                layout="intrinsic"
              />
            </div>
            {isChecked && (
              <textarea
                placeholder="Tell us about your goal..."
                {...register(`companyData.sdgInfo.sdg${option.code}text`)}
                className="my-2 block h-36 w-full rounded-md border border-[#D5D3D3] bg-white p-2 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none"
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
