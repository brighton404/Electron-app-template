import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Layout from './pages/layout';
import ProductPage from './pages/products';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;