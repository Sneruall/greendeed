import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

function Header() {
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
              <HiMenu className="text-main h-8 w-8" />
            )}
          </div>
          <div className="self-center">
            <Link href="/">
              <a
                className={`${
                  mobileMenuExtended
                    ? 'text-white hover:text-white'
                    : 'text-black hover:text-black'
                } my-auto text-xl font-bold hover:no-underline`}
              >
                Greendeed
              </a>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden flex-1 justify-center gap-4 self-center text-sm text-custom-brown1 sm:flex md:gap-6 md:text-base lg:gap-16 xl:gap-20">
            <Link href="/#jobs">
              <a className="my-auto self-center font-omnes font-bold text-custom-brown1">
                Jobs
              </a>
            </Link>
            <Link href="/hiring">
              <a className="my-auto self-center font-omnes font-bold text-custom-brown1">
                Employers
              </a>
            </Link>
            <Link href="/working-for-the-sustainable-development-goals">
              <a className="my-auto self-center font-omnes font-bold text-custom-brown1">
                The Goals
              </a>
            </Link>
            <Link href="/blog">
              <a className="my-auto self-center font-omnes  font-bold text-custom-brown1">
                Blog
              </a>
            </Link>
          </div>

          {/* Post a Job button */}
          <div>
            <Link href="/hiring#post-job">
              <a>
                <button className="button-1 px-4 text-base md:px-8">
                  Post a Job - €250
                </button>
              </a>
            </Link>
          </div>
        </nav>
      </div>
      {/* Mobile navigation menu extended */}
      {mobileMenuExtended && (
        <div className="absolute z-30 h-full w-full transform bg-custom-green4 pt-20 font-omnes text-xl font-bold text-white sm:hidden">
          <ul>
            <Link href="/">
              <a>
                <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                  <span className="ml-3 hover:no-underline">Home</span>
                </li>
              </a>
            </Link>
            <Link href="/#jobs">
              <a>
                <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                  <span className="ml-3">Jobs</span>
                </li>
              </a>
            </Link>
            <Link href="/hiring">
              <a>
                <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                  <span className="ml-3">Employers</span>
                </li>
              </a>
            </Link>
            <Link href="/working-for-the-sustainable-development-goals">
              <a>
                <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                  <span className="ml-3">The Goals</span>
                </li>
              </a>
            </Link>
            <Link href="/blog">
              <a>
                <li className="border-b border-opacity-25 py-3 hover:bg-custom-brown1">
                  <span className="ml-3">Blog</span>
                </li>
              </a>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
