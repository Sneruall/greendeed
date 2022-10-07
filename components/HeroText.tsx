import React from 'react';

type Props = {};

function HeroText({}: Props) {
  return (
    <div>
      <h1 className="font-bold text-gray-900 sm:text-3xl md:text-5xl lg:text-7xl">
        Find <span className="text-green-600">Sustainable Jobs</span> in your
        field of work
      </h1>
      <p className="lg:text-xl">We support the sustainable development goals</p>
    </div>
  );
}

export default HeroText;
