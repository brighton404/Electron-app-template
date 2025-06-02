import { useEffect, useState } from 'react';
import { Product } from '../../types';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    window.electronAPI.getProducts().then(setProducts);
  };

  const deleteProduct = async (id: number) => {
    await window.electronAPI.deleteProduct(id);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price} ({p.stock} left)
            <button onClick={() => deleteProduct(p.id!)}> Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
