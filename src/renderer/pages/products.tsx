import { useState } from 'react';
import ProductForm from '@/renderer/components/productForm';
import ProductTable from '@/renderer/components/productList';
import ResizeLayout from '../components/resize';

const ProductPage = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <section className='page product'>
      <ResizeLayout>
        <ProductTable key={refresh.toString()} />
        <ProductForm onAdd={() => setRefresh(!refresh)} />
      </ResizeLayout>
    </section>
  );
};

export default ProductPage;
