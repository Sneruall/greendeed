import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sdgList } from '../types/types';
import Tooltip from './Tooltip';

type Props = {};

function SdgMenu({}: Props) {
  return (
    <div className="sticky bottom-0 hidden bg-custom-brown1 px-10 py-4 lg:block">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center">
        {sdgList.map((sdg) => {
          return (
            <Tooltip
              textClassname=""
              key={sdg.code}
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
                  className="relative
                  mx-[3px] h-12 w-12 cursor-pointer border-2 border-custom-brown1 hover:scale-105 hover:border-gray-100"
                >
                  <Link href={`#sdg${sdg.code}`} legacyBehavior>
                    <Image
                      src={`/images/icons/sdg-icons/${sdg.code}.png`}
                      objectFit="cover"
                      width="48"
                      height="48"
                      alt={sdg.name}
                    />
                  </Link>
                </button>
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default SdgMenu;
