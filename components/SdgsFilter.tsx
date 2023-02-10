import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { TbArrowBearLeft, TbArrowBearRight } from 'react-icons/tb';
import { searchInputCallback } from '../helpers/search';
import { sdgList } from '../types/types';
import Tooltip from './Tooltip';

type Props = {};

function SdgsFilter({}: Props) {
  const router = useRouter();

  const [selectedSdgs, setSelectedSdgs] = useState<string[]>([]);

  /* When component first renders: Checking the URL for the query string and if it finds it, it will add the query string to the
selectedSdgs array. */
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const itemsToSelect: string[] = [];
    queryParams.forEach((value, key) => {
      if (key === 'sdgs') {
        itemsToSelect.push(...value.split('-'));
      }
    });
    setSelectedSdgs([...selectedSdgs, ...itemsToSelect]);
    console.log('USE EFFECT 1 RUNS' + selectedSdgs + itemsToSelect);
  }, []);

  /* Updating the URL with the selected SDGs. */
  useEffect(() => {
    searchInputCallback(selectedSdgs.join('-'), 'sdgs', router);
    console.log('USE EFFECT 2 RUNS');
  }, [selectedSdgs]);

  function handleButtonClick(sdg: string) {
    if (selectedSdgs.includes(sdg)) {
      // Remove the id from the array
      setSelectedSdgs(selectedSdgs.filter((buttonId) => buttonId !== sdg));
    } else {
      // Add the id to the array
      setSelectedSdgs([...selectedSdgs, sdg]);
    }
  }

  return (
    <div className="mx-2 mt-20">
      <div className="relative mx-4 flex max-w-6xl flex-wrap justify-center sm:mx-auto">
        {sdgList.map((sdg) => {
          return (
            <Tooltip
              key={sdg.code}
              textClassname=""
              className={`w-32 text-white ${
                sdg.code == '1' && 'bg-custom-sdg1'
              } ${sdg.code == '2' && 'bg-custom-sdg2'}  ${
                sdg.code == '3' && 'bg-custom-sdg3'
              } ${sdg.code == '4' && 'bg-custom-sdg4'} ${
                sdg.code == '5' && 'bg-custom-sdg5'
              } ${sdg.code == '6' && 'bg-custom-sdg6'} ${
                sdg.code == '7' && 'bg-custom-sdg7'
              } ${sdg.code == '8' && 'bg-custom-sdg8'} ${
                sdg.code == '9' && 'bg-custom-sdg9'
              } ${sdg.code == '10' && 'bg-custom-sdg10'} ${
                sdg.code == '11' && 'bg-custom-sdg11'
              } ${sdg.code == '12' && 'bg-custom-sdg12'} ${
                sdg.code == '13' && 'bg-custom-sdg13'
              } ${sdg.code == '14' && 'bg-custom-sdg14'} ${
                sdg.code == '15' && 'bg-custom-sdg15'
              } ${sdg.code == '16' && 'bg-custom-sdg16'} ${
                sdg.code == '17' && 'bg-custom-sdg17'
              }`}
              iconClassName="text-main border-white"
              position="top"
              content={sdg.name}
              title={
                <button
                  key={sdg.code}
                  onClick={() => {
                    handleButtonClick(sdg.code);
                  }}
                  className={`${
                    selectedSdgs.includes(sdg.code)
                      ? 'border-custom-brown1 '
                      : 'border-gray-100 '
                  }cursor-pointer relative mx-1 h-12 w-12 border-2`}
                >
                  <Image
                    src={`/images/icons/sdg-icons/${sdg.code}.png`}
                    objectFit="cover"
                    width="48"
                    height="48"
                    alt={sdg.name}
                  />
                  {selectedSdgs.includes(sdg.code) && (
                    <div className="absolute -right-2 -top-2">
                      <HiCheckCircle className="h-5 w-5 rounded-full bg-custom-brown1 text-custom-green2" />
                    </div>
                  )}
                </button>
              }
            />
          );
        })}
        <div className="absolute right-0 bottom-0 translate-y-16 transform font-omnes text-sm font-semibold text-custom-brown4 md:translate-y-4 lg:translate-y-16 xl:-translate-x-10 xl:-translate-y-16">
          <div className="xl:hidden">
            <TbArrowBearLeft className="mx-auto h-10 w-10" />
          </div>
          <p className="xl:hidden">Select your favorite goals</p>
          <p className="hidden xl:block">Select your favorite goals</p>
          <div className="hidden xl:block">
            <TbArrowBearRight className="mx-auto h-10 w-10 rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SdgsFilter;
