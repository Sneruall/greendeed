import Link from 'next/link';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="z-50 mt-10 bg-custom-brown1 pt-10 text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 px-4 py-10 md:px-10 2xl:px-0">
        <div>
          <Link href="/">
            <a className="my-auto text-4xl font-bold text-white">Greendeed</a>
          </Link>{' '}
        </div>
        <div>
          <div>
            <h2 className="text-white">Footer</h2>
          </div>
          <div>
            <h2 className="text-white">Footer</h2>
          </div>
        </div>
      </div>
      <div className="pt-20 text-center text-sm">
        <p>Copyright Greendeed</p>
      </div>
    </footer>
  );
}

export default Footer;
