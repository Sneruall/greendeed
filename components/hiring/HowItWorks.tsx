import Image from 'next/legacy/image';
import React from 'react';

function HowItWorks() {
  return (
    <div className="site-margins mx-auto my-8 max-w-6xl lg:my-16">
      <h1 className="heading-xl mx-auto mb-14 max-w-4xl text-center md:text-left">
        How it works
      </h1>
      <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
        <div className="flex max-w-xs flex-col gap-4">
          <div className="">
            <Image
              src="/images/hiring/step3.png"
              height={150}
              width={200}
              objectFit="contain"
              layout="intrinsic"
              className="-scale-x-100 transform"
              alt="Step 1"
            />
          </div>
          <div>
            <h3 className="heading-sm-omnes">1. Post Your Job</h3>
            <p className="text-main">
              Share your company's sustainability mission and describe your job
              opening to attract purpose-driven talent.
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
              alt="Step 2"
            />
          </div>
          <div>
            <h3 className="heading-sm-omnes">2. Get Validated</h3>
            <p className="text-main">
              Your first job listing is thoroughly evaluated by our team to
              ensure your company supports one or more SDGs.
            </p>
          </div>
        </div>
        <div className="flex max-w-xs flex-col gap-4">
          <div>
            <Image
              src="/images/hiring/step3.png"
              height={150}
              width={200}
              objectFit="contain"
              layout="intrinsic"
              alt="Step 3"
            />
          </div>
          <div>
            <h3 className="heading-sm-omnes">3. Get Candidates</h3>
            <p className="text-main">
              Connect with purpose-driven talent dedicated to making a
              difference and are a perfect fit for your company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
