import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

const Layout = () => {
  return (
    <>
    <Header />
    <main>
        <Sidebar />          
        <Outlet />
    </main>
    </>
  );
};

export default Layout;
