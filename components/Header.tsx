import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="z-50 bg-white py-4 shadow-[0_3px_20px_0px_rgba(0,0,0,0.11)]">
      <nav className="mx-auto flex max-w-screen-2xl justify-between px-4 md:px-10 2xl:px-0">
        <div className="self-center">
          <Link href="/">
            <a className="my-auto text-xl font-bold text-black">Greendeed</a>
          </Link>
        </div>
        <div className="flex gap-4 sm:gap-12">
          <Link href="/blog">
            <a className="my-auto self-center font-alfa text-base text-custom-brown1">
              Blog
            </a>
          </Link>
          <Link href="/hiring">
            <a>
              <button className="rounded-lg bg-custom-yellow1 py-2 px-6 font-alfa text-custom-brown1 hover:opacity-70">
                Post a job
              </button>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
