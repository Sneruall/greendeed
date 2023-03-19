import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { searchInputCallback } from '../helpers/search';
import { sdgList, sdgs } from '../types/types';
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

  function handleSdgButtonClick(sdg: typeof sdgList[number]) {
    let currentSdgPageCode: string | undefined = undefined;
    if (router.pathname != '/') {
      currentSdgPageCode = sdgList.find(
        (sdg) => sdg.uri === '/v1/sdg/Goal/1'
      )?.code;
    }
    if (
      sdg.code ==
      sdgList.find(
        (obj) =>
          `/${sdg.name.replace(/\s+/g, '-').toLowerCase()}-jobs` ==
          router.pathname
      )?.code!
    ) {
      router.replace('/', undefined, {
        scroll: false,
      });
    }
    if (selectedSdgs.includes(sdg.code)) {
      /* Checking if the selectedSdgs array includes the sdg.code. If it does, it will remove the id from the
      array. */
      setSelectedSdgs(selectedSdgs.filter((buttonId) => buttonId !== sdg.code));
    } else if (currentSdgPageCode) {
      const sdgArray = [sdg.code, currentSdgPageCode];
      const query = `sdgs=${sdgArray.join('-')}`;
      const options = { scroll: false };
      router.replace('/', { query }, options);
    } else {
      setSelectedSdgs([...selectedSdgs, sdg.code]);
    }
  }

  return (
    <div className="mx-2 mt-20">
      <div className="relative mx-4 flex max-w-6xl flex-wrap justify-center sm:mx-auto">
        {sdgList.map((sdg) => {
          const matchingSdgRoute =
            router.pathname ==
            `/${sdg.name.replace(/\s+/g, '-').toLowerCase()}-jobs`;

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
                    handleSdgButtonClick(sdg);
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
                  {matchingSdgRoute && (
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
            <svg
              className="mx-auto mb-1 -translate-x-1 rotate-[20deg] transform"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="32"
              viewBox="0 0 95.37 64.321"
            >
              <g
                id="Group_247"
                data-name="Group 247"
                transform="matrix(1, 0.017, -0.017, 1, 4.662, 4.129)"
              >
                <path
                  id="Path_368"
                  data-name="Path 368"
                  d="M86.461,54.429S63.876,23.24.781,12.259L0,12.125,21.914,0h0"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#402C06"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="6"
                />
                <path
                  id="Path_369"
                  data-name="Path 369"
                  d="M0,0,9.552,17.88"
                  transform="translate(0 12.624)"
                  fill="none"
                  stroke="#402C06"
                  stroke-linecap="round"
                  stroke-width="6"
                />
              </g>
            </svg>
          </div>
          <p className=" text-custom-brown1">Select your favorite goals</p>
          <div className="hidden xl:block">
            <svg
              className="mx-auto mt-3 -translate-x-3 rotate-[-30deg] transform"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="32"
              viewBox="0 0 95.37 64.321"
            >
              <g
                id="Group_245"
                data-name="Group 245"
                transform="translate(6 0)"
              >
                <path
                  id="Path_368"
                  data-name="Path 368"
                  d="M86.461,0S63.875,31.19.781,42.17L0,42.3,21.914,54.429h0"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#402C06"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="6"
                />
                <path
                  id="Path_369"
                  data-name="Path 369"
                  d="M0,17.88,9.552,0"
                  transform="translate(0 23.925)"
                  fill="none"
                  stroke="#402C06"
                  stroke-linecap="round"
                  stroke-width="6"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SdgsFilter;
/* Creating an array of objects. Each object has a code, name, title, description, uri, img, and
greendeedDescription. */
