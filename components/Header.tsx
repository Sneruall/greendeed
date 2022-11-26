import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="absolute top-0 z-50 w-full py-4">
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
          <Link href="/hiring#post-job">
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
