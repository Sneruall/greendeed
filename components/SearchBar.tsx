import Image from 'next/legacy/image';
import React from 'react';
import CategoryDropdown from './CategoryDropdown';
import SdgsFilter from './SdgsFilter';
import SearchInput from './SearchInput';

export const SearchBar = () => {
  return (
    <div className="site-margins bg-[url('/images/main/bg-topo2x.png')] bg-cover bg-repeat pb-32 sm:pb-24">
      <div className="mx-auto max-w-4xl pt-24 sm:pt-32">
        <h2 className="heading-2xl mx-auto mb-6 max-w-2xl text-center leading-relaxed">
          Let's find your next Sustainable Job
        </h2>
      </div>
      <div className="mx-auto h-32 max-w-xl">
        <div className="flex h-full w-full text-center">
          <div className="flex-1"></div>
          <div
            id="search"
            className="relative z-10 h-full w-64 flex-initial translate-y-1 transform"
          >
            <Image
              src={'/images/home/finding-a-sustainable-job.png'}
              objectFit="contain"
              layout="fill"
              alt=""
            />
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="shadow-4 relative flex h-14 w-full items-center justify-center rounded-full bg-custom-green2 px-2 font-omnes font-semibold text-custom-brown4 sm:gap-2 sm:px-10">
          <SearchInput />
          <div className="mr-1 h-1/2 w-1 border-l border-black sm:mr-4"></div>
          <CategoryDropdown />
          <div className="md:-translate-y-18 absolute left-0 -translate-y-20 transform text-center text-sm md:-translate-x-24">
            <p className="mb-1 max-w-[100px] text-custom-brown1">
              Search in your field of work
            </p>
            <div className="">
              <svg
                className="mx-auto translate-x-5 rotate-[200deg] transform"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="32"
                viewBox="0 0 95.37 64.321"
              >
                <g
                  id="Group_247"
                  data-name="Group 247"
                  transform="matrix(1, 0.017, -0.017, 1, 4.662, 4.129)"
                >
                  <path
                    id="Path_368"
                    data-name="Path 368"
                    d="M86.461,54.429S63.876,23.24.781,12.259L0,12.125,21.914,0h0"
                    transform="translate(0 0)"
                    fill="none"
                    stroke="#402C06"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="6"
                  />
                  <path
                    id="Path_369"
                    data-name="Path 369"
                    d="M0,0,9.552,17.88"
                    transform="translate(0 12.624)"
                    fill="none"
                    stroke="#402C06"
                    stroke-linecap="round"
                    stroke-width="6"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <SdgsFilter />
    </div>
  );
};
