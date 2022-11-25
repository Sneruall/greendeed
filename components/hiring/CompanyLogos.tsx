import Image from 'next/image';
import React from 'react';

function CompanyLogos() {
  return (
    <>
      <div className="my-16 flex items-start justify-center gap-10">
        <div className="my-auto w-full border border-custom-grey1"></div>
        <div className="flex-none text-center">
          <h2 className="heading-wide">Companies already on greendeed</h2>
        </div>
        <div className="my-auto w-full border border-custom-grey1"></div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-between gap-2 grayscale">
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
    </>
  );
}

export default CompanyLogos;