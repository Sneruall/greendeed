import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import ScrollToTop from '../components/ScrollToTop';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast'; //todo consider importing dynamic or to specific page only

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
