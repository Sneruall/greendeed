import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { searchInputCallback } from '../helpers/search';
import { sdgList } from '../types/types';

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
    <div className="mt-20">
      <ul className="flex flex-wrap justify-center gap-2">
        {sdgList.map((sdg) => {
          return (
            <li
              key={sdg.code}
              onClick={() => {
                handleButtonClick(sdg.code);
              }}
              className={`${
                selectedSdgs.includes(sdg.code)
                  ? 'border-blue-600 '
                  : 'border-gray-200 '
              }cursor-pointer relative h-16 w-16 border-4 transition duration-200 ease-in-out hover:border-blue-600`}
            >
              <Image
                src={`/images/icons/sdg-icons/${sdg.code}.png`}
                objectFit="cover"
                layout="fill"
                alt={sdg.name}
                title={sdg.name}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SdgsFilter;
