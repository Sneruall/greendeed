import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import ScrollToTop from '../components/ScrollToTop';
import { Fragment } from 'react';
import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Toaster />
      <div className="h-full min-h-screen bg-[#FDFFF8]">
        <Component {...pageProps} />
        <ScrollToTop />
      </div>
    </Fragment>
  );
}

export default MyApp;
