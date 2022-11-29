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
              className="peer h-3 w-3 cursor-pointer rounded border-2 bg-transparent text-black focus:ring-0"
              onClick={handleChange}
              {...register(`companyData.sdgInfo.sdg${option.code}`)}
            />
            <div className="w-full"></div>
          </div>

          <div className="relative m-1">
            <div className="peer inline-flex cursor-pointer self-center transition duration-200 ease-in-out">
              <Image
                src={'/images/icons/sdg-icons/' + option.code + '.png'}
                width={100}
                height={100}
                objectFit="contain"
                layout="intrinsic"
              />
            </div>
            <div className="invisible absolute -top-[140px] z-20 h-32 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 peer-hover:visible dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 lg:peer-hover:opacity-100">
              <div className="space-y-2 p-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {option.name}
                </h3>
                <p>
                  Report helps navigate cumulative growth of community
                  activities. Ideally, the chart should have a growing trend, as
                  stagnating chart signifies a significant decrease of community
                  activity.
                </p>
                <a
                  href="#"
                  className="flex items-center font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-600"
                >
                  Read more{' '}
                  <svg
                    className="ml-1 h-4 w-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
              <div data-popper-arrow></div>
              <div data-popper-arrow></div>
            </div>
          </div>
          {isChecked && (
            <textarea
              placeholder="Tell us about your goal..."
              {...register(`companyData.sdgInfo.sdg${option.code}text`)}
              className="my-2 block h-36 w-full rounded-md border border-[#D5D3D3] bg-white p-2 text-sm text-black shadow-[0_9px_20px_0px_rgba(0,0,0,0.06)] focus:outline-none"
            />
          )}
        </label>
        <div className="text-red-500">{errors?.message}</div>
      </div>
    </li>
  );
};

export default SdgElement;
