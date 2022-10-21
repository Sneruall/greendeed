import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full min-h-screen bg-[#FDFFF8]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
