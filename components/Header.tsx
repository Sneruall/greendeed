import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="sticky z-50 bg-green-500 py-4">
      <div className="mx-auto flex max-w-screen-2xl justify-end">
        <Link href="/">
          <a className="flex-1">
            <h1 className="my-auto text-xl font-bold">Greendeed</h1>
          </a>
        </Link>
        <Link href="/blog">
          <a className="flex-1">
            <h1 className="my-auto text-xl font-bold">Blog</h1>
          </a>
        </Link>
        <Link href="/hiring">
          <a>
            <button className="rounded-full bg-red-600 py-2 px-4 text-white hover:opacity-70">
              Post a job
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
