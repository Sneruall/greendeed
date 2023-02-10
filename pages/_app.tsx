import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import ScrollToTop from '../components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { Fragment } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);
  return (
    <Fragment>
      <Toaster />
      <div className="h-full min-h-screen bg-[#FDFFF8]">
        {layout}
        <ScrollToTop />
      </div>
    </Fragment>
  );
}

export default MyApp;
