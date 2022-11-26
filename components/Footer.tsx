import Link from 'next/link';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="z-50 mt-10 bg-custom-brown1 pt-10 text-white">
      <div className="site-margins mx-auto grid max-w-screen-2xl gap-6 py-10 md:grid-cols-2">
        <div>
          <Link href="/">
            <a className="my-auto text-4xl font-bold text-white">Greendeed</a>
          </Link>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </p>
          </div>
        </div>

        <div>
          <div>
            <h2 className="heading-lg text-white">Information</h2>
            <Link href="/">
              <a className="footer-link">Hiring</a>
            </Link>
          </div>
          <div>
            <h2 className="heading-lg text-white">Contact</h2>
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
