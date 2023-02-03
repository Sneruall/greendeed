import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import ScrollToTop from '../components/ScrollToTop';
import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Toaster />
      <div className="h-full min-h-screen bg-[#FDFFF8]">
        <Component {...pageProps} />
        <ScrollToTop />
      </div>
    </Layout>
  );
}

export default MyApp;
