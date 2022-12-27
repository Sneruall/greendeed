import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="absolute top-0 z-50 w-full py-4 ">
      <nav className="mx-auto flex max-w-screen-2xl justify-between px-4 md:px-10 2xl:px-0">
        <div className="self-center">
          <Link href="/">
            <a className="my-auto text-xl font-bold text-black">Greendeed</a>
          </Link>
        </div>
        <div className="hidden flex-1 justify-center gap-4 self-center text-custom-brown1 sm:flex md:gap-12 lg:gap-24 xl:gap-32">
          <Link href="/#jobs">
            <a className="my-auto self-center font-omnes text-base font-bold text-custom-brown1">
              Jobs
            </a>
          </Link>
          <Link href="/hiring">
            <a className="my-auto self-center font-omnes text-base font-bold text-custom-brown1">
              Hiring
            </a>
          </Link>
          <Link href="/working-for-the-sustainable-development-goals">
            <a className="my-auto self-center font-omnes text-base font-bold text-custom-brown1">
              The 17 Goals
            </a>
          </Link>
          <Link href="/blog">
            <a className="my-auto self-center font-omnes text-base font-bold text-custom-brown1">
              Blog
            </a>
          </Link>
        </div>
        <div>
          <Link href="/hiring#post-job">
            <a>
              <button className="button-1 text-base">Post a Job - $250</button>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
