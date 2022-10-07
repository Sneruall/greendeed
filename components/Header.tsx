import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="z-50 py-4">
      <nav className="mx-auto flex max-w-screen-2xl justify-between px-10 2xl:px-0">
        <div className="self-center">
          <Link href="/">
            <a className="my-auto text-xl font-bold text-black">Greendeed</a>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/blog">
            <a className="my-auto self-center font-bold text-black">Blog</a>
          </Link>
          <Link href="/hiring">
            <a>
              <button className="rounded-full bg-yellow-400 py-2 px-4 text-sm text-black hover:opacity-70">
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
