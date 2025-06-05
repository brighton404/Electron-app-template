import { useState } from 'react';
import ProductForm from '@/renderer/components/productForm';
import ProductTable from '@/renderer/components/productList';
import Resizable from '../components/resize';

const ProductPage = () => {
  const [refresh, setRefresh] = useState(false);
  return (
      <section className='page product'>
        <div className="extend">
        <section className='content'>
          <ProductTable key={refresh.toString()} />
        </section>
        </div>
        <Resizable side="left">
          <ProductForm onAdd={() => setRefresh(!refresh)} />
        </Resizable>
      </section>
  );
};

export default ProductPage;
