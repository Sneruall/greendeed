import Image from 'next/image';
import React from 'react';

function CompanyLogos() {
  return (
    <div className="my-20">
      <div className="my-16 flex items-start justify-center gap-10">
        <div className="my-auto w-full border border-custom-grey1"></div>
        <div className="flex-none text-center">
          <h2 className="heading-wide">
            Companies already{' '}
            <span className="hidden sm:inline">on greendeed</span>
            <br className="sm:hidden"></br>
            <span className="sm:hidden">on greendeed</span>
          </h2>
        </div>
        <div className="my-auto w-full border border-custom-grey1"></div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 grayscale sm:flex-row">
        <div>
          <Image
            src={'/images/hiring/company1.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
        <div>
          <Image
            src={'/images/hiring/company2.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
        <div>
          <Image
            src={'/images/hiring/company3.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
        <div>
          <Image
            src={'/images/hiring/company1.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
        <div>
          <Image
            src={'/images/hiring/company2.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
        <div>
          <Image
            src={'/images/hiring/company3.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
        <div>
          <Image
            src={'/images/hiring/company1.png'}
            width={200}
            height={50}
            objectFit="contain"
            layout="intrinsic"
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyLogos;
