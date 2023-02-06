import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import ScrollToTop from '../components/ScrollToTop';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Script
        async
        src="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/js/uikit-icons.min.js"
      />
      <Layout>
        <Toaster />
        <div className="h-full min-h-screen bg-[#FDFFF8]">
          <Component {...pageProps} />
          <ScrollToTop />
        </div>
      </Layout>
    </Fragment>
  );
}

export default MyApp;
