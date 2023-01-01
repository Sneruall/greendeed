import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { sdgs } from '../../../types/types';

type Props = {
  register: any;
  errors: any;
  // todo, no any below
  sdg: any;
  retrievedSdgs?: sdgs;
};

// {retrievedSdgs?.find((sdgObj) => {
//   return sdgObj.sdg === +sdg.code;
// })}

const SdgElement = ({ errors, register, sdg, retrievedSdgs }: Props) => {
  const retrievedSdgsIncludesThisSdg = () => {
    return retrievedSdgs?.some((sdgObj) => sdgObj.sdg == sdg.code); // true or false
  };

  const [isChecked, setIsChecked] = useState(false);
  const [sdgText, setSdgText] = useState('');

  useEffect(() => {
    if (retrievedSdgsIncludesThisSdg()) {
      setIsChecked(true);

      const matchedSdg = retrievedSdgs?.find((sdgObj) => {
        return sdgObj?.sdg == sdg.code;
      });

      setSdgText(matchedSdg?.text || '');
    }
    // register(`companyData.sdgs.${sdg.code}`); WERKT NIET
    // register(`companyData.sdgsInfo.${sdg.code}`);
  }, [retrievedSdgs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
    setIsChecked((current) => !current);
  };

  return (
    <li key={sdg.code} className={`${isChecked && 'col-span-2 row-span-2'}`}>
      <div
        className={`shadow-1 h-full rounded-lg border-2 border-custom-grey3 bg-white p-1`}
      >
        <label htmlFor={sdg.code} className="w-full cursor-pointer">
          <div className="mb-2 flex">
            <input
              checked={isChecked}
              type="checkbox"
              id={sdg.code}
              className="peer h-3 w-3 cursor-pointer rounded border-2 bg-transparent text-black focus:ring-0"
              onClick={handleChange}
              {...register(`companyData.sdgs.${sdg.code}`)}
            />
            <div className="w-full"></div>
          </div>

          <div className="relative m-1">
            <div className="peer inline-flex cursor-pointer self-center transition duration-200 ease-in-out">
              <Image
                src={'/images/icons/sdg-icons/' + sdg.code + '.png'}
                width={100}
                height={100}
                objectFit="contain"
                layout="intrinsic"
              />
            </div>
            <div className="absolute bottom-[110px] z-20 hidden w-56 overflow-hidden rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 md:invisible md:-left-[62px] md:block md:peer-hover:visible md:peer-hover:opacity-100 lg:-left-[142px] lg:w-96 xl:left-0">
              <div className="space-y-2 p-3">
                <h3 className="font-semibold text-custom-brown1">{sdg.name}</h3>
                <p className="text-xs text-custom-brown1">{sdg.description}</p>
                {/* <a
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
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a> */}
              </div>
              <div data-popper-arrow></div>
              <div data-popper-arrow></div>
            </div>
          </div>
          {isChecked && (
            <textarea
              required={isChecked}
              defaultValue={sdgText}
              placeholder="Tell us about your goal..."
              {...register(`companyData.sdgsInfo.${sdg.code}`)}
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
