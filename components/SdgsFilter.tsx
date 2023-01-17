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
  }, []);

  /* Updating the URL with the selected SDGs. */
  useEffect(() => {
    searchInputCallback(selectedSdgs.join('-'), 'sdgs', router);
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
      <div className="flex flex-wrap justify-center gap-2">
        {sdgList.map((sdg) => {
          return (
            <button
              key={sdg.code}
              onClick={() => {
                handleButtonClick(sdg.code);
              }}
              className={`${
                selectedSdgs.includes(sdg.code) && 'ring-2 ring-lime-500 '
              }cursor-pointer transition duration-200 ease-in-out hover:z-10 hover:scale-150`}
            >
              <Image
                src={`/images/icons/sdg-icons/${sdg.code}.png`}
                height={60}
                width={60}
                objectFit="contain"
                layout="intrinsic"
                alt={sdg.name}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SdgsFilter;
