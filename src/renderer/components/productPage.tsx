import { useState } from 'react';
import ProductForm from './productForm';
import ProductList from './productList';

const ProductPage = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <ProductForm onAdd={() => setRefresh(!refresh)} />
      <ProductList key={refresh.toString()} />
    </div>
  );
};

export default ProductPage;
