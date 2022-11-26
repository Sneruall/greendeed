import Image from 'next/image';
import React from 'react';

function HowItWorks() {
  return (
    <div className="mx-auto my-32 max-w-6xl">
      <h1 className="heading-xl mx-auto mb-14 max-w-4xl">How it works</h1>
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
        <div className="flex max-w-xs flex-col gap-4">
          <div>
            <Image
              src="/images/hiring/step2.png"
              height={150}
              width={200}
              objectFit="contain"
              layout="intrinsic"
            />
          </div>
          <div>
            <h3 className="heading-sm-ict">1. Post your job</h3>
            <p className="text-main">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </p>
          </div>
        </div>
        <div className="flex max-w-xs flex-col gap-4">
          <div>
            <Image
              src="/images/hiring/step2.png"
              height={150}
              width={200}
              objectFit="contain"
              layout="intrinsic"
            />
          </div>
          <div>
            <h3 className="heading-sm-ict">2. Get validated</h3>
            <p className="text-main">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </p>
          </div>
        </div>
        <div className="flex max-w-xs flex-col gap-4">
          <div>
            <Image
              src="/images/hiring/step2.png"
              height={150}
              width={200}
              objectFit="contain"
              layout="intrinsic"
            />
          </div>
          <div>
            <h3 className="heading-sm-ict">3. Get candidates</h3>
            <p className="text-main">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
