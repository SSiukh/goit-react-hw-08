import { Suspense } from 'react';
import AppBar from './AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <div className="container">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </>
  );
};

export default Layout;
