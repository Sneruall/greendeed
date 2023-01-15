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

  useEffect(() => {
    searchInputCallback(selectedSdgs.join('-'), 'sdgs', router);
  }, [selectedSdgs]);

  return (
    <div className="mt-20">
      <div className="flex flex-wrap justify-center gap-2">
        {sdgList.map((sdg) => {
          return (
            <button
              key={sdg.code}
              onClick={() => {
                setSelectedSdgs((prevSdgs) => [...prevSdgs, sdg.code]);
              }}
              className="cursor-pointer transition duration-200 ease-in-out hover:z-10 hover:scale-150"
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
