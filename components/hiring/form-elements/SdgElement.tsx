import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { sdgs, sdgList, Company } from '../../../types/types';

type Props = {
  register: any;
  errors: any;
  sdg: typeof sdgList[number];
  retrievedSdgs?: sdgs;
  setRetrievedCompanyData: React.Dispatch<
    React.SetStateAction<Company | undefined>
  >;
};

let updatedRetrievedSdgs: sdgs | undefined;

const SdgElement = ({
  errors,
  register,
  sdg,
  retrievedSdgs,
  setRetrievedCompanyData,
}: Props) => {
  const retrievedSdgsIncludesThisSdg = () => {
    return retrievedSdgs?.some((sdgObj) => sdgObj.sdg == sdg.code);
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
  }, [retrievedSdgs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
    } else {
      console.log('⛔️ Checkbox is NOT checked');

      // Code block to run when the SDG that is unchecked is currently stored in the DB
      // To make sure it won't be retained.
      if (retrievedSdgsIncludesThisSdg()) {
        // set updatedRetrievedSdgs to retrievedSdgs if it is still undefined (no existing sdg has been deleted yet)
        if (!updatedRetrievedSdgs) {
          updatedRetrievedSdgs = retrievedSdgs;
        }

        // Update it to only keep those that were not unchecked.
        updatedRetrievedSdgs = updatedRetrievedSdgs?.filter((el) => {
          return el.sdg != sdg.code;
        });

        // Update it back to the Form component so it is used on submission.
        setRetrievedCompanyData(
          (prevState) =>
            ({
              ...prevState,
              sdgs: updatedRetrievedSdgs,
            } as Company)
        );
      }
    }
    // uncheck the box.
    setIsChecked((current) => !current);
  };

  return (
    <li className={`${isChecked && 'col-span-2 row-span-2'}`}>
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
                className="contain"
                alt=""
              />
            </div>
            <div className="absolute bottom-[110px] z-20 hidden w-56 overflow-hidden rounded-lg border border-gray-200 bg-white text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 md:invisible md:-left-[62px] md:block md:peer-hover:visible md:peer-hover:opacity-100 lg:-left-[142px] lg:w-96 xl:left-0">
              <div className="space-y-2 p-3">
                <h3 className="font-semibold text-custom-brown1">{sdg.name}</h3>
                <p className="text-xs text-custom-brown1">{sdg.description}</p>
              </div>
              <div data-popper-arrow></div>
              <div data-popper-arrow></div>
            </div>
          </div>
          {isChecked && (
            <textarea
              maxLength={1000}
              required={isChecked}
              defaultValue={sdgText}
              placeholder="How does your company target this goal? Be short and to the point. Max 1000 characters."
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
