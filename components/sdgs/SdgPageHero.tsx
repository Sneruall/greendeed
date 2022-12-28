import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sdgList } from '../../types/types';

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
          <div className="my-4 flex justify-center gap-24">
            <div className="text-right">
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
          <ul className="flex gap-2">
            {/* {sdglist.map((similarJob) => {
          return <SimilarJobItem job={similarJob} key={similarJob.id} />;
        })} */}
            {sdgList.map((sdg) => {
              return (
                <li
                  key={sdg.code}
                  className="cursor-pointer transition duration-200 ease-in-out hover:scale-110"
                >
                  <Link href={`#sdg${sdg.code}`}>
                    <Image
                      src={`/images/icons/sdg-icons/${sdg.code}.png`}
                      height={100}
                      width={100}
                      objectFit="contain"
                      layout="intrinsic"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SdgPageHero;
