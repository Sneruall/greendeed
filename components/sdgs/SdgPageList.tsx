import Image from 'next/image';
import React from 'react';
import { sdgList } from '../../types/types';

type Props = {};

function SdgPageList({}: Props) {
  return (
    <div className="">
      <ul className="mx-auto flex flex-col gap-8">
        {sdgList.map((sdg, i) => {
          return (
            <li
              id={'sdg' + sdg.code}
              key={sdg.code}
              className={`${i % 2 !== 0 ? 'sdgListEven' : 'sdgListOdd'} ${
                sdg.code === '1' && 'bg-custom-sdg1'
              } ${sdg.code === '2' && 'bg-custom-sdg2'}  ${
                sdg.code === '3' && 'bg-custom-sdg3'
              } ${sdg.code === '4' && 'bg-custom-sdg4'} ${
                sdg.code === '5' && 'bg-custom-sdg5'
              } ${sdg.code === '6' && 'bg-custom-sdg6'} ${
                sdg.code === '7' && 'bg-custom-sdg7'
              } ${sdg.code === '8' && 'bg-custom-sdg8'} ${
                sdg.code === '9' && 'bg-custom-sdg9'
              } ${sdg.code === '10' && 'bg-custom-sdg10'} ${
                sdg.code === '11' && 'bg-custom-sdg11'
              } ${sdg.code === '12' && 'bg-custom-sdg12'} ${
                sdg.code === '13' && 'bg-custom-sdg13'
              } ${sdg.code === '14' && 'bg-custom-sdg14'} ${
                sdg.code === '15' && 'bg-custom-sdg15'
              } ${sdg.code === '16' && 'bg-custom-sdg16'} ${
                sdg.code === '17' && 'bg-custom-sdg17'
              }
          max-w-screen-2xl flex-row text-white`}
            >
              <div
                className={`${
                  i % 2 === 0 && 'ml-auto'
                } flex max-w-3xl flex-row items-center justify-center gap-10 p-8`}
              >
                <div
                  className={`${
                    i % 2 !== 0 && 'order-2'
                  } min-w-[100px] md:flex-shrink-0`}
                >
                  <Image
                    src={'/images/icons/sdg-icons/' + sdg.code + '.png'}
                    width={150}
                    height={150}
                    objectFit="contain"
                    layout="intrinsic"
                    alt={sdg.name}
                  />
                </div>
                <div className="">
                  <h2 className="heading-md-omnes text-white">{sdg.title}</h2>
                  <p>{sdg.greendeedDescription}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SdgPageList;
