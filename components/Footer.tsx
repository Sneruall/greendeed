import Link from 'next/link';
import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="z-50 bg-custom-brown1 py-10 text-white">
      <div className="site-margins mx-auto my-10 grid max-w-screen-2xl gap-6 md:grid-cols-2 md:gap-10 md:px-10 lg:px-16 xl:px-32">
        <div>
          <Link
            href="/"
            className="my-auto text-4xl font-bold text-white hover:no-underline">
            
              Greendeed
            
          </Link>
          <div className="mt-4 max-w-md italic">
            <p>
              At Greendeed, we believe that sustainable job opportunities should
              be accessible to everyone, and that the SDGs provide a clear and
              comprehensive guide for doing so. Join us in our mission to create
              a better future for all by exploring the sustainable job
              opportunities on our platform today.
            </p>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2">
          <div className="mb-4 flex flex-col gap-2">
            <h3 className="heading-md text-white">Information</h3>
            <div>
              <Link href="/#jobs" className="footer-link">
                Jobs
              </Link>
            </div>
            <div>
              <Link href="/hiring" className="footer-link">
                Hiring
              </Link>
            </div>
            <div>
              <Link href="/blog" className="footer-link">
                Blog
              </Link>
            </div>
            <div>
              <Link
                href="/working-for-the-sustainable-development-goals"
                className="footer-link">
                Sustainable Goals
              </Link>
            </div>
            <div>
              <Link href="#" className="footer-link">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="heading-md text-white">Contact</h2>
            <div>
              <Link href="mailto:info@greendeed.io" className="footer-link">
                info@greendeed.io
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
