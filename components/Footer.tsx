import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="z-50 mt-10 bg-brown-500 pt-10 text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-4 px-4 md:px-10 2xl:px-0">
        <div>
          <h2 className="text-white">Footer</h2>
        </div>
        <div>
          <h2 className="text-white">Footer</h2>
        </div>
        <div>
          <h2 className="text-white">Footer</h2>
        </div>
        <div>
          <h2 className="text-white">Footer</h2>
        </div>
      </div>
      <div className="pt-20 text-center text-sm">
        <p>Copyright Greendeed</p>
      </div>
    </footer>
  );
}

export default Footer;
