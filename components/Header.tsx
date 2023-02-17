import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Header: React.FC<{ darkmode?: Boolean }> = ({ darkmode }) => {
  const [mobileMenuExtended, setMobileMenuExtended] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuExtended(!mobileMenuExtended);
  };

  // Close mobile menu on change of route
  const router = useRouter();
  useEffect(() => {
    setMobileMenuExtended(false);
    return () => {};
  }, [router]);

  useEffect(() => {
    if (mobileMenuExtended) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuExtended]);

  return (
    <>
      <div className="absolute top-0 z-40 w-full py-4">
        <nav className="mx-auto flex max-w-screen-2xl justify-between px-4 md:px-10 2xl:px-0">
          <div
            className="self-center hover:cursor-pointer hover:underline sm:hidden"
            onClick={() => toggleMobileMenu()}
          >
            {mobileMenuExtended ? (
              <HiX className="h-8 w-8 text-white" />
            ) : (
              <HiMenu
                className={`${darkmode ? 'text-white' : 'text-main'} h-8 w-8`}
              />
            )}
          </div>
          <div className="flex items-center gap-1 self-center sm:w-40 md:w-52">
            <div>
              <Link
                href="/"
                className={`${
                  mobileMenuExtended || darkmode ? 'text-white' : 'text-black'
                } my-auto text-xl font-bold hover:no-underline`}
              >
                Greendeed
              </Link>
            </div>
            <div className={`${darkmode && 'hidden'}`}>
              <Image
                alt="Greendeed logo icon"
                src="/images/main/logo-icon.png"
                width={40}
                height={40}
              />
            </div>
          </div>
          {/* Desktop Navigation */}
          <div
            className={`${
              darkmode ? 'text-white' : 'text-custom-brown1'
            } hidden flex-1 justify-center gap-4 self-center text-sm sm:flex md:gap-6 md:text-base lg:gap-16 xl:gap-20`}
          >
            <Link
              href="/#jobs"
              className="my-auto self-center font-omnes font-bold hover:opacity-80"
            >
              Jobs
            </Link>
            <Link
              href="/hiring"
              className="my-auto self-center font-omnes font-bold hover:opacity-80"
            >
              Hiring
            </Link>
            <Link
              href="/working-for-the-sustainable-development-goals"
              className="my-auto self-center font-omnes font-bold hover:opacity-80"
            >
              The Goals
            </Link>
            <Link
              href="/blog"
              className="my-auto self-center font-omnes font-bold hover:opacity-80"
            >
              Blog
            </Link>
          </div>

          {/* Post a Job button */}
          <div className="sm:w-40 md:w-48 lg:w-52">
            <Link href="/hiring#post-job">
              <button className="button-1 px-4 md:px-6 md:text-base lg:px-8">
                Post a Job - €250
              </button>
            </Link>
          </div>
        </nav>
      </div>
      {/* Mobile navigation menu extended */}
      {mobileMenuExtended && (
        <div className="absolute z-30 h-full w-full transform bg-custom-green4 pt-20 font-omnes text-xl font-bold text-white sm:hidden">
          <ul>
            <Link href="/">
              <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                <span className="ml-3 hover:no-underline">Home</span>
              </li>
            </Link>
            <Link href="/#jobs">
              <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                <span className="ml-3">Jobs</span>
              </li>
            </Link>
            <Link href="/hiring">
              <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                <span className="ml-3">Hiring</span>
              </li>
            </Link>
            <Link href="/working-for-the-sustainable-development-goals">
              <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                <span className="ml-3">The Goals</span>
              </li>
            </Link>
            <Link href="/blog">
              <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                <span className="ml-3">Blog</span>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
