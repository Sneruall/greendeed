import { Fragment } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// AltLayout.tsx
interface Props {
  children: React.ReactNode;
}

export default function AltLayout({ children }: Props) {
  return (
    <Fragment>
      <Header darkmode={true} />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
