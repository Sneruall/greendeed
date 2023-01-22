import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sdgList } from '../../types/types';
import Tooltip from '../Tooltip';

type Props = {};

function SdgPageHero({}: Props) {
  return (
    <div className="site-margins">
      <div className="mx-auto max-w-6xl pt-24 sm:pt-32">
        <div>
          <h1 className="heading-2xl mb-6">Working for sustainable goals</h1>
          <h2 className="heading-md-omnes">
            The 17 Sustainable Development Goals Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam Lorem ipsum dolor sit amet,
            What is it
          </h2>
        </div>
        <div className="my-20">
          <div className="my-4 flex flex-wrap gap-2 md:flex-nowrap md:justify-center md:gap-8 lg:gap-24">
            <div className="md:text-right">
              <h3 className="heading-sm-omnes2">Advantages of using them</h3>
              <p className="font-century italic leading-relaxed text-custom-brown1">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata
              </p>
            </div>
            <div className="flex-none">
              <Image
                src="/images/hiring/step2.png"
                height={250}
                width={250}
                objectFit="contain"
                layout="intrinsic"
              />
            </div>
            <div className="">
              <h3 className="heading-sm-omnes2">Advantages of using them</h3>
              <p className="font-century italic leading-relaxed text-custom-brown1">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata
              </p>
            </div>
          </div>
          <div className="my-10 flex flex-wrap justify-center gap-2">
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
                  h-12 w-12 cursor-pointer border-2 border-gray-100 hover:scale-105 hover:border-custom-brown1"
                    >
                      <Link href={`#sdg${sdg.code}`}>
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
      </div>
    </div>
  );
}

export default SdgPageHero;
