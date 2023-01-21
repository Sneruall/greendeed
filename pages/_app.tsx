import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import ScrollToTop from '../components/ScrollToTop';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full min-h-screen bg-[#FDFFF8]">
      <Component {...pageProps} />
      <ScrollToTop />
    </div>
  );
}

export default MyApp;
