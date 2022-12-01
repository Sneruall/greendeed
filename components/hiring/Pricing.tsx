import Link from 'next/link';
import React from 'react';

function Pricing() {
  return (
    <div>
      <div className="shadow-1 mx-auto my-20 max-w-xl bg-custom-green1">
        <div className="mb-16 pt-16 text-center">
          <h2 className="heading-lg">What you get / included</h2>
        </div>
        <div className="mt-20 flex flex-col gap-4 text-center">
          <h3 className="heading-sm-omnes">Upload company logo + web link</h3>
          <div className="mx-auto w-20 border border-custom-grey1"></div>
          <h3 className="heading-sm-omnes">60 days visible</h3>
          <div className="mx-auto w-20 border border-custom-grey1"></div>
          <h3 className="heading-sm-omnes">Own unique company page</h3>
          <div className="mx-auto w-20 border border-custom-grey1"></div>
          <h3 className="heading-sm-omnes">Premium customer support</h3>
          <div className="mx-auto w-20 border border-custom-grey1"></div>
          <h3 className="heading-sm-omnes">
            % discount for volunteer vacancies
          </h3>
          <div className="my-16">
            <Link href="#post-job">
              <a>
                <button className="button-1">Post Job Now!</button>
              </a>
            </Link>
            <div>
              <p className="my-2 text-sm tracking-wide">For only $250</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
