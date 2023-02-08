import { Fragment } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

// MainLayout.tsx (Prop interface omitted if using JS)
interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
