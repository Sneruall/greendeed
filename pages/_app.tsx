import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full min-h-screen bg-amber-100">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
