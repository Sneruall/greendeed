import Link from 'next/link';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="z-50 mt-10 bg-custom-brown1 py-10 text-white">
      <div className="site-margins mx-auto my-10 grid max-w-screen-2xl gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <Link href="/">
            <a className="my-auto text-4xl font-bold text-white">Greendeed</a>
          </Link>
          <div className="mt-4 max-w-md italic">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </p>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2">
          <div className="mb-4 flex flex-col gap-2">
            <h2 className="heading-md text-white">Information</h2>
            <div>
              <Link href="/#jobs">
                <a className="footer-link">Jobs</a>
              </Link>
            </div>
            <div>
              <Link href="/hiring">
                <a className="footer-link">Hiring</a>
              </Link>
            </div>
            <div>
              <Link href="/blog">
                <a className="footer-link">Blog</a>
              </Link>
            </div>
            <div>
              <Link href="/working-for-the-sustainable-development-goals">
                <a className="footer-link">Sustainable Goals</a>
              </Link>
            </div>
            <div>
              <Link href="#">
                <a className="footer-link">Terms & Conditions</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="heading-md text-white">Contact</h2>
            <div>
              <Link href="mailto:info@greendeed.io">
                <a className="footer-link">info@greendeed.io</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-sm">
        <p>© 2023 greendeed | Made sustainably</p>
      </div>
    </footer>
  );
}

export default Footer;
