import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { sdgList } from '../types/types';
import Tooltip from './Tooltip';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="z-50 bg-custom-brown1 py-10 text-white">
      <div className="site-margins mx-auto my-10 max-w-screen-2xl gap-6 md:flex md:gap-10 md:px-10 lg:px-16 xl:px-32">
        <div>
          <Link
            href="/"
            className="my-auto text-4xl font-bold text-white hover:no-underline"
          >
            Greendeed
          </Link>
          <div className="my-2 max-w-md text-sm italic">
            <p>
              At Greendeed, we believe that sustainable job opportunities should
              be accessible to everyone, and that the SDGs provide a clear and
              comprehensive guide for doing so. Join us in our mission to create
              a better future for all by exploring the sustainable job
              opportunities on our platform today!
            </p>
          </div>
          <div className="mt-4 flex gap-4 md:grid md:grid-cols-2">
            <div className="mb-4 flex flex-col gap-2">
              <h3 className="heading-md text-sm text-white">Navigation</h3>
              <div className="text-sm">
                <Link href="/#jobs" className="footer-link">
                  Jobs
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/hiring" className="footer-link">
                  Hiring
                </Link>
              </div>
              <div className="text-sm">
                <Link
                  href="/working-for-the-sustainable-development-goals"
                  className="footer-link"
                >
                  SDGs
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/blog" className="footer-link">
                  Blog
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="heading-md text-sm text-white">Contact</h2>
              <div>
                <Link
                  href="mailto:info@greendeed.io"
                  className="footer-link text-sm"
                >
                  info@greendeed.io
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h2 className="heading-md mb-2 text-sm text-white">
            Jobs Targeting the SDGs
          </h2>
          <div className="flex flex-row gap-2 text-sm md:gap-10">
            <ul>
              {sdgList.slice(0, 9).map((sdgItem) => {
                return (
                  <li key={sdgItem.code} className="mt-1">
                    <Link
                      href={`/?sdgs=${sdgItem.code}#jobs`}
                      className="footer-link"
                    >
                      {sdgItem.name} Jobs
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul>
              {sdgList.slice(9, 17).map((sdgItem) => {
                return (
                  <li key={sdgItem.code} className="mt-1">
                    <Link
                      href={`/?sdgs=${sdgItem.code}#jobs`}
                      className="footer-link"
                    >
                      {sdgItem.name} Jobs
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto my-4 flex flex-wrap justify-center px-10 sm:px-0 md:mx-auto">
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
                  mx-[3px] h-12 w-12 cursor-pointer border-2 border-custom-brown1 hover:scale-105 hover:border-gray-100"
                  >
                    <Link
                      href={`/working-for-the-sustainable-development-goals#sdg${sdg.code}`}
                      legacyBehavior
                    >
                      <Image
                        src={`/images/icons/sdg-icons/${sdg.code}.png`}
                        style={{ objectFit: 'cover' }}
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
      <div className="text-center text-sm">
        <p>
          © 2023 greendeed |{' '}
          <span className="hover:underline">
            <Link
              href="https://www.websitecarbon.com/website/greendeed-io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check our website's footprint
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
